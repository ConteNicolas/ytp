

import { ipcMain } from "electron";


import { YoutubeService } from "../services/youtube-service";

const youtubeService = new YoutubeService();

export const registerYoutubeIpcHandler = () => {
  ipcMain.handle('download:video', async (event, item) => {  
    return await youtubeService.enqueueDownload(item, (success, message, status) => {
      event.sender.send('download:video:response', { success, message, status });
    });
  });
}
