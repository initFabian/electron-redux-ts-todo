if (process.env.NODE_ENV === 'development') {
    require('electron-compile').enableLiveReload()
}

import { app, ipcMain } from 'electron'
import { MainWindow } from './MainWindow'
import { StoreFactory, StoreHelpers } from '../store/store'
import { INITIAL_STATE_FILE_PATH } from '../utils/constants'
import MenuBar from './MenuBar'

let menubarWindow: any
let mainWindow: any

let store = StoreFactory()

app.on('ready', () => {
    console.log('App is ready')
    menubarWindow = MenuBar()
    mainWindow = MainWindow()

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
