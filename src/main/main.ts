import { app } from 'electron'
import { MainWindow } from './MainWindow'
import { StoreFactory, StoreHelpers } from '../store/store'
import { INITIAL_STATE_FILE_PATH } from '../utils/constants'
import MenuBar from './MenuBar'
import * as isDev from 'electron-is-dev'
import appUpdater from './AutoUpdater'

if (isDev) {
    require('electron-compile').enableLiveReload()
}

let menubarWindow: any
let mainWindow: any

let store = StoreFactory()

// Funtion to check the current OS. As of now there is no proper method to add auto-updates to linux platform.
function isWindowsOrmacOS() {
    return process.platform === 'darwin' || process.platform === 'win32'
}

app.on('ready', () => {
    menubarWindow = MenuBar()
    mainWindow = MainWindow()
    const { webContents } = mainWindow

    webContents.once('did-frame-finish-load', () => {
        const checkOS = isWindowsOrmacOS()
        if (checkOS && !isDev) {
            // Initate auto-updates on macOs and windows
            appUpdater()
        }
    })

    mainWindow.on('close', () => {
        console.log('Writing state to file')
        StoreHelpers.writeStateToFile(INITIAL_STATE_FILE_PATH, store)
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
