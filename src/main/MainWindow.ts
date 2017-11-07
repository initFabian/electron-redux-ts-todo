import { BrowserWindow } from 'electron'
import { INDEX_HTML_PATH } from '../utils/constants'


let mainWindow: BrowserWindow

export const MainWindow = (): BrowserWindow => {
    mainWindow = new BrowserWindow({
        x: -1420,
        y: 10,
        width: 1000,
        height: 1080
    })

    mainWindow.loadURL(INDEX_HTML_PATH)

    if (process.env.NODE_ENV !== 'production') {
        mainWindow.webContents.openDevTools()
    }

    return mainWindow
}
