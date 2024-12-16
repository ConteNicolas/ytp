import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    youtube: YoutubeAPI,
    setting: SettingAPI,
    pendrive: PendriveAPI,
    userHistory: HistoryAPI
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

interface PendriveAPI {
  selectPendrivePath: () => Promise<string | null>;
}

interface HistoryAPI {
  getHistory: () => Promise<any[]>;
  clearHistory: () => Promise<void>;
  removeHistoryItem: (id: string) => Promise<void>;
}