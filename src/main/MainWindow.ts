import { BrowserWindow } from 'electron'

let mainWindow: BrowserWindow

export const MainWindow = (URL): BrowserWindow => {
    mainWindow = new BrowserWindow()

    mainWindow.loadURL(URL)
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools()
    }

    return mainWindow
}
