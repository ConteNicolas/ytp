import { dialog } from "electron";
import { SettingService } from "./setting-service";

import fs from "fs";
import path from "path";

import { check } from "diskusage";

export class PendriveService {
  private _settingService = new SettingService();

  public async selectPendrivePath(): Promise<string | null> {
    const result = await dialog.showOpenDialog({
      title: "Seleccionar carpeta del Pendrive",
      properties: ["openDirectory"],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  }

  public async getPendriveInformation(): Promise<any> {
    const pendrivePath = await this._settingService.getSettingValue("pendrive_path");

    if (!pendrivePath || !fs.existsSync(pendrivePath)) {
      throw new Error("No se encontró la ruta del pendrive.");
    }

    const files = fs.readdirSync(pendrivePath);

    let usedSpace = 0;

    const fileDetails = files
      .map((file) => {
        const filePath = path.join(pendrivePath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
          const extension = path.extname(file);
          const name = path.basename(file, extension);
          const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

          usedSpace += stats.size;

          return {
            name,
            extension,
            size: `${sizeInMB} MB`,
          };
        }

        return null;
      })
      .filter((file) => file !== null && file.extension === ".mp3");

    let totalSpace = 0;
    let freeSpace = 0;
    let totalSpaceInMB = "0";
    let usedSpaceInMB = "0";
    let freeSpaceInMB = "0";

    try {
      const diskStats = await check(pendrivePath);

      totalSpace = diskStats.total; 
      freeSpace = diskStats.free;   

      usedSpaceInMB = ((totalSpace - freeSpace) / (1024 * 1024)).toFixed(2); //
      totalSpaceInMB = (totalSpace / (1024 * 1024)).toFixed(2); 
      freeSpaceInMB = (freeSpace / (1024 * 1024)).toFixed(2); 
    } catch (error) {
      console.error('Error al obtener estadísticas del pendrive:', error);
      throw new Error('No se pudo obtener la información del pendrive.');
    }

    return {
      files: fileDetails,
      totalSpace: `${totalSpaceInMB} MB`,
      usedSpace: `${usedSpaceInMB} MB`,
      freeSpace: `${freeSpaceInMB} MB`,
    };
  }

  public async clearPendrive() {
    const pendrivePath = await this._settingService.getSettingValue("pendrive_path");

    if (!pendrivePath || !fs.existsSync(pendrivePath)) {
      throw new Error("No se encontro la ruta de descarga.");
    }

    const files = fs.readdirSync(pendrivePath);

    for (const file of files) {
      const filePath = path.join(pendrivePath, file);

      const stats = fs.statSync(path.join(pendrivePath, file));

      if (stats.isFile() && file.endsWith(".mp3")) {
        fs.unlinkSync(filePath);
      }

    }
  }

  public async deletePendriveItem(file: string) {
    const pendrivePath = await this._settingService.getSettingValue("pendrive_path");

    if (!pendrivePath || !fs.existsSync(pendrivePath)) {
      throw new Error("No se encontro la ruta de descarga.");
    }

    const filePath = path.join(pendrivePath, file);
    fs.unlinkSync(filePath);
  }
}
