import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    youtube: YoutubeAPI
  }
}

interface YoutubeAPI {
  downloadVideoAsMp3: (item: any) => any; 
  onDownloadVideoAsMp3Response: (callback: (response: YTDownloadResponse) => void) => void;
}