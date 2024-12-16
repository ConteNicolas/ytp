import { dialog } from "electron";

export class PendriveService {
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
}
