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

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('youtube', youtubeAPI)
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
}
