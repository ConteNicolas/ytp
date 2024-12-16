

import { ipcMain } from "electron";

import { HistoryService } from "../services/history-service";

const historyService = new HistoryService();

export const registerHistoryIpcHandler = () => {
  ipcMain.handle('get:history', async (event) => {
    return await historyService.getHistory();
  });
}