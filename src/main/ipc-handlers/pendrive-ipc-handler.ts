import { ipcMain } from "electron";
import { PendriveService } from "../services/pendrive-service";

const pendriveService = new PendriveService();

export const registerPendriveIpcHandler = () => {
  ipcMain.handle("pendrive:select-path", async () => {
    return await pendriveService.selectPendrivePath();
  });

  ipcMain.handle("pendrive:get-info", async () => {
    return await pendriveService.getPendriveInformation();
  });

  ipcMain.handle("pendrive:clear-pendrive", async () => {
    return await pendriveService.clearPendrive();
  });

  ipcMain.handle("pendrive:delete-pendrive-item", async (event, file) => {
    return await pendriveService.deletePendriveItem(file);
  });
};