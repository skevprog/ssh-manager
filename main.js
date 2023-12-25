const { app, BrowserWindow, ipcMain,dialog } = require('electron')

const path = require('node:path')

let mainWindow;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

ipcMain.on('show-dialog', () => {
  dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Information',
      message: 'This is an informational dialog',
      buttons: ['OK']
  });
});