import { BrowserWindow } from 'electron'
import { INDEX_HTML_PATH } from '../utils/constants'
import * as isDev from 'electron-is-dev'

let mainWindow: BrowserWindow

export const MainWindow = (): BrowserWindow => {
    mainWindow = new BrowserWindow()

    mainWindow.loadURL(INDEX_HTML_PATH)

    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    return mainWindow
}
