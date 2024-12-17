import { ipcMain } from "electron";

import { SettingService } from "../services/setting-service";

const settingService = new SettingService();

export const registerSettingIpcHandler = () => {
  ipcMain.handle('get:setting', async (_, key) => {
    return await settingService.getSettingValue(key);
  });

  ipcMain.handle('set:setting', async (_, key, value) => {
    settingService.setSetting(key, value);
  });
}