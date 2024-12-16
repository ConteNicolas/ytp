import { spawn } from "child_process";
import { app } from "electron";
import fs from "fs";
import path from "path";
import { SettingService } from "./setting-service";
import { HistoryService } from "./history-service";
import { v4 as uuidv4 } from "uuid";

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

  public enqueueDownload(
    item: any,
    onDownloadFinishCallback: (success: boolean, message: string) => void
  ) {
    if (this._historyService.alreadyDownloaded(item.url, item.title)) {
      onDownloadFinishCallback(true, `Cancion "${item.title}" ya fue descargada.`);
      return;
    }

    const id = uuidv4();
    const newItem: HistoryItem = {
      id,
      url: item.url,
      title: item.title,
      thumbnail: item.thumbnail,
      status: "in-queue",
      reason: null,
      time: new Date().toISOString(),
      outputDir: this._settingService.getSettingValue("pendrive_path"),
    };

    this._historyService.addToHistory(newItem);
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
  
    const downloads = this.getDownloads();
  
    for (const item of downloads) {
      if (item.status === "in-queue" || item.status === "downloading") {
        item.status = "downloading";
        this._historyService.updateHistory(item);
  
        const success = await this.downloadSong(item);
  
        if (success) {
          item.status = "downloaded";
          item.reason = "Descarga completada.";
        } else {
          item.status = "error";
          item.reason = `Error: Falló la descarga.`;
        }
  
        item.time = new Date().toISOString();
        this._historyService.updateHistory(item);
      }
    }
  
    const downloadsUntilNow = this.getDownloads();
  
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
        this.getDownloads().filter((x) => x.status === "downloaded").length
      );
  
      onAllDownloadsComplete();
    }
  }


  private downloadSong(item: HistoryItem): Promise<boolean> {
    return new Promise((resolve) => {
      const ytDlpPath = path.join(app.getAppPath(), "/resources/yt-dlp.exe");

      if (!fs.existsSync(ytDlpPath)) {
        console.error("yt-dlp.exe no encontrado.");
        resolve(false);
        return;
      }

      const args = ["-x", "--audio-format", "mp3", "-o", `${item.outputDir}/%(title)s.%(ext)s`, item.url];
      const process = spawn(ytDlpPath, args);

      process.on("close", (_) => resolve(true));

      process.on("error", (err) => {
        console.error(`Error: ${err.message}`);
        resolve(false);
      });
    });
  }

  private getDownloads(): HistoryItem[] {
    return this._historyService.getHistory();
  }

  private resumePendingDownloads() {
    console.log("Reanudando descargas pendientes...");
    this.processQueue(() => {
      console.log("Todas las descargas pendientes han sido procesadas.");
    });
  }
}
