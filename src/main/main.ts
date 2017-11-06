if (process.env.NODE_ENV === 'development') {
    require('electron-compile').enableLiveReload()
}

import { app, ipcMain, autoUpdater } from 'electron'
import { MainWindow } from './MainWindow'
import { StoreFactory, StoreHelpers } from '../store/store'
import { INITIAL_STATE_FILE_PATH } from '../utils/constants'
import MenuBar from './MenuBar'
import { INDEX_HTML_PATH } from '../utils/constants'
import * as os from 'os'

var platform = os.platform() + '_' + os.arch()
var version = app.getVersion()
console.log(platform)
autoUpdater.setFeedURL(`https://electron-todo-updater.herokuapp.com/update/${platform}/${version}`)

// let menubarWindow: any
let mainWindow: any

let store = StoreFactory()

ipcMain.on('GET_VERSION_NUMBER', (event, arg) => {
    event.sender.send('VERSION_MESSAGE', app.getVersion())
})

app.on('ready', () => {
    console.log(`VERSION: ${app.getVersion()}`)
    console.log('App is ready')
    // menubarWindow = MenuBar()
    mainWindow = MainWindow()

    // autoUpdater.checkForUpdates()
    mainWindow.on('close', () => {
        console.log('Writing state to file')
        StoreHelpers.writeStateToFile(INITIAL_STATE_FILE_PATH)
        mainWindow = null
    })
})

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = MainWindow()
    }
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function sendStatusToWindow(text) {
    mainWindow.webContents.send('MESSAGE', text)
}

// autoUpdater.on('checking-for-update', () => {
//     console.log('AGGGHGHHGG')
//     sendStatusToWindow('Checking for update...')
// })
// autoUpdater.on('update-available', (info) => {
//     sendStatusToWindow('Update available.')
// })
// autoUpdater.on('update-not-available', (info) => {
//     sendStatusToWindow('Update not available.')
// })
// autoUpdater.on('error', (err) => {
//     sendStatusToWindow('Error in auto-updater.')
// })
// autoUpdater.on('download-progress', (progressObj) => {
//     let log_message = "Download speed: " + progressObj.bytesPerSecond
//     log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
//     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
//     sendStatusToWindow(log_message)
// })
// autoUpdater.on('update-downloaded', (info) => {
//     sendStatusToWindow('Update downloaded will install in 5 seconds')
//     // Wait 5 seconds, then quit and install
//     // In your application, you don't need to wait 5 seconds.
//     // You could call autoUpdater.quitAndInstall() immediately
//     setTimeout(function () {
//         autoUpdater.quitAndInstall()
//     }, 5000)
// })