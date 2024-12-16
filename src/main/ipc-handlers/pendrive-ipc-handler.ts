import { ipcMain } from "electron";
import { PendriveService } from "../services/pendrive-service";

const pendriveService = new PendriveService();

export const registerPendriveIpcHandler = () => {
  ipcMain.handle("pendrive:select-path", async () => {
    return await pendriveService.selectPendrivePath();
  });
};