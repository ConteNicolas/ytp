

import { ipcMain } from "electron";

import { HistoryService } from "../services/history-service";

const historyService = new HistoryService();

export const registerHistoryIpcHandler = () => {
  ipcMain.handle('get:history', async (_) => {
    return await historyService.getHistory();
  });

  ipcMain.handle('clear:history', async (_) => {
    return await historyService.clearHistory();
  });

  ipcMain.handle('remove:history', async (event, id) => {
    return await historyService.removeHistoryItem(id);
  });
}