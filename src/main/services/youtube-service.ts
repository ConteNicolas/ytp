import { spawn } from "child_process";
import { app } from "electron";
import fs from "fs";
import path from "path";
import { SettingService } from "./setting-service";
import { HistoryService } from "./history-service";
import { v4 as uuidv4 } from "uuid";
import { is } from "@electron-toolkit/utils";
import db from "../config/db";

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  status: "in-queue" | "downloading" | "downloaded" | "error";
  reason: string | null;
  time: string;
  outputDir: string;
}

export class YoutubeService {
  private _settingService = new SettingService();
  private _historyService = new HistoryService();
  private isProcessing = false;

  private _isQueueCompleted = false;

  constructor() {
    this.resumePendingDownloads();
  }

  public async enqueueDownload(
    item: any,
    onDownloadFinishCallback: (success: boolean, message: string) => void
  ) {

    if (await this._settingService.getSettingValue("pendrive_path") === "") {
      onDownloadFinishCallback(false, "No se ha configurado la ruta de descarga.");
      return;
    }

    if (await this._historyService.alreadyDownloaded(item.url, item.title) && !item?.isDownloadingAgain) {
      onDownloadFinishCallback(true, `Cancion "${item.title}" ya fue descargada.`);
      return;
    }

    if (!item?.isDownloadingAgain) {
      const id = uuidv4();
      const newItem: HistoryItem = {
        id,
        url: item.url,
        title: item.title,
        thumbnail: item.thumbnail,
        status: "in-queue",
        reason: null,
        time: new Date().toISOString(),
        outputDir: await this._settingService.getSettingValue("pendrive_path"),
      };

      await this._historyService.addToHistory(newItem);
    } else {
      await this._historyService.updateStatusByName(item.title, "in-queue");
    }

    console.log(`Cancion en cola: ${item.title}`);
    onDownloadFinishCallback(false, `Cancion "${item.title}" en cola.`);

    if (!this.isProcessing && this._isQueueCompleted) {
      this.processQueue(() => {
        onDownloadFinishCallback(true, "Todas las descargas han finalizado.");
      });
    }
  }

  private async processQueue(onAllDownloadsComplete: () => void) {
    this.isProcessing = true;
    this._isQueueCompleted = false;

    const downloads = await this.getDownloads();

    for (const item of downloads) {
      console.log("Item descarga ", item);
      if (item.status === "in-queue" || item.status === "downloading") {
        item.status = "downloading";
        await this._historyService.updateHistory(item);

        const success = await this.downloadSong(item);

        if (success) {
          item.status = "downloaded";
          item.reason = "Descarga completada.";
        } else {
          item.status = "error";
          item.reason = `Error: Falló la descarga.`;
        }

        item.time = new Date().toISOString();
        await this._historyService.updateHistory(item);
      }
    }

    const downloadsUntilNow = await this.getDownloads();

    if (downloadsUntilNow.some((x) => x.status === "in-queue")) {
      console.log("Hay descargas pendientes, reanudando...");
      await this.processQueue(onAllDownloadsComplete);
      return;
    }

    if (!this._isQueueCompleted) {
      this._isQueueCompleted = true;
      this.isProcessing = false;

      console.log("Todas las descargas han finalizado.");
      console.log(
        "Cantidad total de canciones descargadas: ",
        (await this.getDownloads()).filter((x) => x.status === "downloaded").length
      );

      onAllDownloadsComplete();
    }
  }


  private downloadSong(item: HistoryItem): Promise<boolean> {
    return new Promise((resolve) => {
      const basePath = is.dev
        ? path.join(app.getAppPath(), "resources")
        : path.join(process.resourcesPath, "app.asar.unpacked", "resources");

      const ytDlpPath = path.join(basePath, "yt-dlp.exe");

      if (!fs.existsSync(ytDlpPath)) {
        console.error("yt-dlp.exe no encontrado.");
        resolve(false);
        return;
      }

      const args = ["-x", "--audio-format", "mp3", "-o", `${item.outputDir}/%(title)s.%(ext)s`, item.url];
      const p = spawn(ytDlpPath, args);

      p.on("close", (_) => {
        resolve(true)
      });

      p.on("error", (err) => {
        db.prepare("INSERT INTO errors (error) VALUES (?)").run(err.message);

        console.error(`Error: ${err.message}`);
        resolve(false);
      });
    });
  }

  private async getDownloads(): Promise<HistoryItem[]> {
    return await this._historyService.getHistory();
  }

  private resumePendingDownloads() {
    console.log("Reanudando descargas pendientes...");
    this.processQueue(() => {
      console.log("Todas las descargas pendientes han sido procesadas.");
    });
  }
}
