import { ipcMain } from "electron";

import { SettingService } from "../services/setting-service";

const settingService = new SettingService();

export const registerSettingIpcHandler = () => {
  ipcMain.handle('get:setting', async (event, key) => {
    return await settingService.getSettingValue(key);
  });

  ipcMain.handle('set:setting', async (event, key, value) => {
    settingService.setSetting(key, value);
  });
}