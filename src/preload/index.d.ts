import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    youtube: YoutubeAPI,
    setting: SettingAPI
  }
}

interface YoutubeAPI {
  downloadVideoAsMp3: (item: any) => any; 
  onDownloadVideoAsMp3Response: (callback: (response: YTDownloadResponse) => void) => void;
}

interface SettingAPI {
  getSettingValue: (key: string) => any;
  setSetting: (key: string, value: any) => void;
}