import { app, BrowserWindow } from 'electron';
import * as path from 'path';


let win: BrowserWindow | null;


const createWindow = (): void => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    });


    win.loadURL(
        process.env.ELECTRON_START_URL ||
            `file://${path.join(__dirname, '../build/index.html')}`
    );

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})