import { spawn } from "child_process";
import { app } from "electron";

import fs from "fs";
import path from "path";
import { SettingService } from "./setting-service";
import { HistoryService } from "./history-service";

import { v4 as uuidv4 } from 'uuid';

export class YoutubeService {
  private _settingService = new SettingService();
  private _historyService = new HistoryService();

  public async downloadVideoAsMp3(
    item: any,
    onDownloadFinishCallback: (success: boolean, message: string) => void
  ) {
    // Verificar si la canción ya fue descargada
    if (this._historyService.alreadyDownloaded(item.url, item.title)) {
      onDownloadFinishCallback(true, `Canción ${item.title} ya ha sido descargada.`);
      return;
    }

    console.log("Descargando ", item.url);

    const ytDlpPath = path.join(app.getAppPath(), '/resources/yt-dlp.exe');

    if (!fs.existsSync(ytDlpPath)) {
      onDownloadFinishCallback(false, 'yt-dlp.exe not found.');
      return;
    }

    const output = this._settingService.getSettingValue('pendrive_path');
    console.log("Carpeta de salida ", output);

    // Configuración de los argumentos para la descarga
    const args = ['-x', '--audio-format', 'mp3', '-o', `${output}/%(title)s.%(ext)s`, item.url];

    // Generar un ID único para esta descarga
    const id = uuidv4();

    // Iniciar el proceso de descarga
    const process = spawn(ytDlpPath, args);

    console.log("Descarga en progreso...");

    // Notificar que la descarga ha iniciado
    onDownloadFinishCallback(false, `Comenzando descarga de ${item.title}...`);

    // Escuchar cuando el proceso se cierra
    process.on('close', (code) => {
      console.log(`Proceso finalizado con código: ${code}`);

      if (code !== 0) {
        console.error("Error durante la descarga");
        this._historyService.addToHistory({
          id: id,
          url: item.url,
          title: item.title,
          thumbnail: item.thumbnail,
          isSuccess: false,
          reason: `Error: Código de salida ${code}`,
          time: new Date(),
          outputDir: output
        });
        onDownloadFinishCallback(false, `Error: No se pudo descargar ${item.title}.`);
      } else {
        console.log("Descarga completa");
        this._historyService.addToHistory({
          id: id,
          url: item.url,
          title: item.title,
          thumbnail: item.thumbnail,
          isSuccess: true,
          reason: "Descarga completa",
          time: new Date(),
          outputDir: output
        });
        onDownloadFinishCallback(true, `Canción ${item.title} descargada exitosamente.`);
      }
    });

    // Escuchar errores del proceso
    process.on('error', (err) => {
      console.error(`Error al ejecutar el proceso: ${err.message}`);
      this._historyService.addToHistory({
        id: id,
        url: item.url,
        title: item.title,
        thumbnail: item.thumbnail,
        isSuccess: false,
        reason: `Error al ejecutar el proceso: ${err.message}`,
        time: new Date(),
        outputDir: output
      });
      onDownloadFinishCallback(false, `Error: ${err.message}`);
    });
  }
}
