import * as  path from 'path'
import FileOps from '../utils/FileOps.utils'

export const INDEX_HTML_PATH = require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: path.resolve(__dirname, '..', 'app', 'index.html')
})

export const INITIAL_STATE_FILE_PATH = FileOps.ensureOutputDirectory(path.resolve(__dirname, '..', 'store'), 'initialState.json')

export const ADD_TODO = 'ADD_TODO'
export type ADD_TODO = typeof ADD_TODO

export const TOGGLE_TODO = 'TOGGLE_TODO'
export type TOGGLE_TODO = typeof TOGGLE_TODO

export const REMOVE_TODO = 'REMOVE_TODO'
export type REMOVE_TODO = typeof REMOVE_TODO

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export type SET_VISIBILITY_FILTER = typeof SET_VISIBILITY_FILTER

export const ADD_ERROR = 'ADD_ERROR'
export type ADD_ERROR = typeof ADD_ERROR

export const CLEAR_ERROR = 'CLEAR_ERROR'
export type CLEAR_ERROR = typeof CLEAR_ERROR
