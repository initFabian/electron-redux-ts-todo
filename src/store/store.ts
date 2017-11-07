import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { electronEnhancer } from 'redux-electron-store'
import { INITIAL_STATE_FILE_PATH } from '../utils/constants'
import FileOps from '../utils/FileOps.utils'
import { StoreState } from './types'
let defaultState = require(INITIAL_STATE_FILE_PATH)

let store: Store<StoreState>

const consoleMessages = store => next => action => {
    let result

    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log('todos', store.getState().todos.length)
    let { todos, errors } = store.getState()
    console.log(`
    todos: ${JSON.stringify(todos)}
    errors: ${errors}
    `)

    console.groupEnd()
    result = next(action)

    return result
}

export const StoreHelpers = {
    writeStateToFile: (filepath: string, _store: Store<StoreState>) => {
        FileOps.updateFile(filepath, _store.getState())
    }
}

export const StoreFactory = (initialState = defaultState) => {

    let middleware = (() => {
        if (process.type === 'renderer') {
            return applyMiddleware(thunk, consoleMessages)
        }
        return applyMiddleware(thunk)
    })()

    let enhancer = compose(
        middleware,
        electronEnhancer({
            dispatchProxy: a => store.dispatch(a),
        })
    )

    store = createStore(appReducer, initialState, enhancer)

    return store
}
