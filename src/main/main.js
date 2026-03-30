import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

let mainWindow = null;
let closeTimeout = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    },
    title: 'Calendar Notes Themes'
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.webContents.send('app:before-close');

    // Force-close after 5 seconds if renderer doesn't respond
    closeTimeout = setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.destroy();
      }
    }, 5000);
  });
}

function buildMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Theme',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow.webContents.send('menu:new-theme')
        },
        {
          label: 'Open Theme...',
          accelerator: 'CmdOrCtrl+O',
          click: () => mainWindow.webContents.send('menu:open-theme')
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow.webContents.send('menu:save')
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => mainWindow.webContents.send('menu:save-as')
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => mainWindow.close()
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers
ipcMain.handle('theme:open', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Open Theme File',
    filters: [{ name: 'Theme Files', extensions: ['json'] }],
    properties: ['openFile']
  });
  if (result.canceled || result.filePaths.length === 0) return null;

  const filePath = result.filePaths[0];
  try {
    const content = readFileSync(filePath, 'utf-8');
    return { filePath, content: JSON.parse(content) };
  } catch (err) {
    await dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: 'Error Opening Theme',
      message: `Failed to read theme file:\n${err.message}`
    });
    return null;
  }
});

ipcMain.handle('theme:save', async (_event, { filePath, theme }) => {
  try {
    writeFileSync(filePath, JSON.stringify(theme, null, 2), 'utf-8');
    return true;
  } catch (err) {
    await dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: 'Error Saving Theme',
      message: `Failed to save theme file:\n${err.message}`
    });
    return false;
  }
});

ipcMain.handle('theme:save-as', async (_event, { theme }) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Save Theme As',
    filters: [{ name: 'Theme Files', extensions: ['json'] }],
    defaultPath: `${theme.name || 'NewTheme'}.json`
  });
  if (result.canceled) return null;

  try {
    writeFileSync(result.filePath, JSON.stringify(theme, null, 2), 'utf-8');
    return result.filePath;
  } catch (err) {
    await dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: 'Error Saving Theme',
      message: `Failed to save theme file:\n${err.message}`
    });
    return null;
  }
});

ipcMain.handle('dialog:confirm-save', async (_event, message) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    buttons: ['Save', "Don't Save", 'Cancel'],
    defaultId: 0,
    cancelId: 2,
    title: 'Unsaved Changes',
    message: message || 'You have unsaved changes. What would you like to do?'
  });
  return result.response; // 0=Save, 1=Don't Save, 2=Cancel
});

ipcMain.on('app:force-close', () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  mainWindow.destroy();
  app.quit();
});

app.whenReady().then(() => {
  buildMenu();
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
