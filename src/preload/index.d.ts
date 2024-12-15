import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}


interface API {
  downloadVideo: (details: { url: string; outputDir: string }) => Promise<YTDownloadResponse>;
}