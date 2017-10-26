import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AddError } from '../store/actions/error.action'
import { StoreFactory } from '../store/store'
import App from './components/App.component'
import { ipcRenderer } from 'electron'


ipcRenderer.send('GET_VERSION_NUMBER')

ipcRenderer.on('VERSION_MESSAGE', function (event, versionText) {
    ReactDOM.render(
        <div>
            Current version: v{versionText}
        </div>,
        document.getElementById('version')
    )
})

ipcRenderer.on('MESSAGE', function (event, messageText) {
    console.log('MESSAGE is happening')
    ReactDOM.render(
        <div>
            {messageText}
        </div>,
        document.getElementById('messages')
    )
})

const initialState = (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    {}
const store = StoreFactory(initialState)

store.subscribe(() => {
    console.log('saving state to local storage')
    localStorage['redux-store'] = JSON.stringify(store.getState())
})

window['React'] = React
window['store'] = store

window.addEventListener('error', (error) => {
    store.dispatch(
        AddError(error.message)
    )
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
