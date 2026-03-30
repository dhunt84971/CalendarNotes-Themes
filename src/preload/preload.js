// CJS require() is used here because Electron's preload scripts run in a
// sandboxed CommonJS context. ESM import is not supported in preload scripts.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('themeAPI', {
  openTheme: () => ipcRenderer.invoke('theme:open'),
  saveTheme: (filePath, theme) => ipcRenderer.invoke('theme:save', { filePath, theme }),
  saveThemeAs: (theme) => ipcRenderer.invoke('theme:save-as', { theme }),
  confirmSave: (message) => ipcRenderer.invoke('dialog:confirm-save', message),
  forceClose: () => ipcRenderer.send('app:force-close'),

  // The ipcRenderer.on() listeners below do not need cleanup (removeListener)
  // because Electron runs the preload script exactly once per window creation.
  // The listeners cannot stack from repeated calls.
  onMenuNewTheme: (callback) => ipcRenderer.on('menu:new-theme', (_event) => callback()),
  onMenuOpenTheme: (callback) => ipcRenderer.on('menu:open-theme', (_event) => callback()),
  onMenuSave: (callback) => ipcRenderer.on('menu:save', (_event) => callback()),
  onMenuSaveAs: (callback) => ipcRenderer.on('menu:save-as', (_event) => callback()),
  onBeforeClose: (callback) => ipcRenderer.on('app:before-close', (_event) => callback())
});
