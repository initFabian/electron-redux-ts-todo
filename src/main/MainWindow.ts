import { BrowserWindow } from 'electron'
import { INDEX_HTML_PATH } from '../utils/constants'


let mainWindow: BrowserWindow

export const MainWindow = (): BrowserWindow => {
    mainWindow = new BrowserWindow()

    mainWindow.loadURL(INDEX_HTML_PATH)

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools()
    }

    return mainWindow
}
