
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let win = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  win.loadFile('index.html');
  win.maximize();

  win.webContents.on('did-finish-load', () => {
    win.show();
  });
}

app.allowRendererProcessReuse = true;
app.whenReady().then(createWindow);
