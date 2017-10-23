import * as C from '../utils/constants'
import { combineReducers } from 'redux'
import { TodoType } from './types'
import { ErrorAction, TodoAction } from './actions/types.action'

// Filter 

export const filter = (state = { isCompleted: false }, action: TodoAction) => {
    switch (action.type) {
        case C.SET_VISIBILITY_FILTER:
            return {
                isCompleted: !state.isCompleted
            }
        default:
            return state
    }
}

// Todos

function allTodos(state: Array<TodoType> = [], action: TodoAction): Array<TodoType> {
    switch (action.type) {
        case C.ADD_TODO:

            const hasTodo = state.some(todo => todo.title === action.payload)

            return (hasTodo) ? state : [
                ...state,
                {
                    title: action.payload,
                    completed: false
                }
            ]
        case C.TOGGLE_TODO:
            return state.map((todo, i) => {
                if (i === action.payload) {
                    todo.completed = !todo.completed
                }
                return todo
            })

        case C.REMOVE_TODO:
            return state.filter((todo, i) => i !== action.payload)
        default:
            return state
    }
}

// Errors

export const errors = (state: Array<String> = [], action: ErrorAction) => {
    switch (action.type) {
        case C.ADD_ERROR:
            return [
                ...state,
                action.payload
            ]
        case C.CLEAR_ERROR:
            return state.filter((message, i) => i !== action.payload)
        default:
            return state
    }
}

export default combineReducers({
    filter,
    todos: allTodos,
    errors
})
