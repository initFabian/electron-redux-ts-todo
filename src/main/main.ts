if (process.env.NODE_ENV === 'development') {
    require('electron-compile').enableLiveReload()
}

import { app, ipcMain, BrowserWindow } from 'electron'
import { MainWindow } from './MainWindow'
import { StoreFactory, StoreHelpers } from '../store/store'
import { INITIAL_STATE_FILE_PATH } from '../utils/constants'
import MenuBar from './MenuBar'
import { autoUpdater } from "electron-updater"
import log from 'electron-log'
import { INDEX_HTML_PATH } from '../utils/constants'

let menubarWindow: any
let mainWindow: BrowserWindow | null

let store = StoreFactory()

app.on('ready', () => {
    console.log(`VERSION: ${app.getVersion()}`)
    console.log('App is ready')
    menubarWindow = MenuBar()
    mainWindow = MainWindow(`${INDEX_HTML_PATH}#v${app.getVersion()}`)
    autoUpdater.checkForUpdates();
    mainWindow.on('close', () => {
        console.log('Writing state to file')
        StoreHelpers.writeStateToFile(INITIAL_STATE_FILE_PATH)
        mainWindow = null
    })
})

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = MainWindow(`${INDEX_HTML_PATH}#v${app.getVersion()}`)
    }
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function sendStatusToWindow(text) {
    log.info(text);
    (mainWindow as BrowserWindow).webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded; will install in 5 seconds');
    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 5 seconds.
    // You could call autoUpdater.quitAndInstall(); immediately
    setTimeout(function () {
        autoUpdater.quitAndInstall();
    }, 5000)
})