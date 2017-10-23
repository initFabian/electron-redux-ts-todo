import * as C from '../../utils/constants'
import { TodoAction } from './types.action'

export function AddTodo(title: string): TodoAction {
    return {
        type: C.ADD_TODO,
        payload: title
    }
}

export function UpdateTodo(index: number): TodoAction {
    return {
        type: C.TOGGLE_TODO,
        payload: index
    }
}

export function RemoveTodo(index: number): TodoAction {
    return {
        type: C.REMOVE_TODO,
        payload: index
    }
}

export function SetVisibilityFilter(): TodoAction {
    return {
        type: C.SET_VISIBILITY_FILTER
    }
}
