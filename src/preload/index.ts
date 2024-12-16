import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

const youtubeAPI = {
  downloadVideoAsMp3: async (item) => {
    return await ipcRenderer.invoke('download:video', item);
  },
  onDownloadVideoAsMp3Response: (callback) => {
    ipcRenderer.on('download:video:response', (_, response) => {
      callback(response);
    });
  }
}

const settingAPI = {
  getSettingValue: (key) => {
    return ipcRenderer.invoke('get:setting', key);
  },
  setSetting: (key, value) => {
    ipcRenderer.invoke('set:setting', key, value);
  }
}

const pendriveAPI = {
  selectPendrivePath: () => {
    return ipcRenderer.invoke('pendrive:select-path');
  }
}

const historyAPI = {
  getHistory: () => {
    return ipcRenderer.invoke('get:history');
  },
  clearHistory: () => {
    return ipcRenderer.invoke('clear:history');
  },
  removeHistoryItem: (id) => {
    return ipcRenderer.invoke('remove:history', id);
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('youtube', youtubeAPI)
    contextBridge.exposeInMainWorld('setting', settingAPI)
    contextBridge.exposeInMainWorld('pendrive', pendriveAPI)
    contextBridge.exposeInMainWorld('userHistory', historyAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.youtube = youtubeAPI
  // @ts-ignore (define in dts)
  window.setting = settingAPI
  // @ts-ignore (define in dts)
  window.pendrive = pendriveAPI
  // @ts-ignore (define in dts)
  window.userHistory = historyAPI
}
