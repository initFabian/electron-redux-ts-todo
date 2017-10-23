import * as menubar from 'menubar'
import { INDEX_HTML_PATH } from '../utils/constants'
import * as path from 'path'
import { ipcMain, BrowserWindow } from 'electron'

let mb: menubar

mb = menubar({
    index: 'main.ts',
    width: 500,
    nodeIntegration: false,
    height: 700,
    resizable: false,
    tray: false,
    'show-dock-icon': true,
    icon: path.join(__dirname, '..', '..', 'icons/todo-app-icon.png')
})
mb.on('ready', function ready() {
    console.log('Menubar app is ready')
})
mb.on('after-create-window', () => {
    mb.window.loadURL(INDEX_HTML_PATH)
})

export default () => {
    return mb
}
