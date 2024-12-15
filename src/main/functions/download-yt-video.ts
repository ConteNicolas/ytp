import { spawn } from "child_process";
import { app } from "electron";
import path from "path";

const fs = require('fs');

export interface YTDownloadResponse {
  success: boolean;
  message: string;
}


export const downloadYtVideo = async (url: string, outputDir: string): Promise<YTDownloadResponse> => {
  const ytDlpPath = path.join(app.getAppPath(), '/resources/yt-dlp.exe');

  if (!fs.existsSync(ytDlpPath)) {
    return { success: false, message: 'yt-dlp.exe not found.' };
  }

  const args = ['-x', '--audio-format', 'mp3', '-o', `${outputDir}/%(title)s.%(ext)s`, url];
  const process = spawn(ytDlpPath, args);

  process.on('close', (code) => {
    if (code !== 0) {
      return { success: true, message: 'Download completed.' };
    } else {
      return { success: false, message: 'Download failed.' };
    }
  });

  return { success: false, message: 'Download in progress.' };
};