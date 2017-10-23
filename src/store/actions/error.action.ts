import { ErrorAction } from './types.action'
import * as C from '../../utils/constants'

export function AddError(message: string): ErrorAction {
    return {
        type: C.ADD_ERROR,
        payload: message
    }
}

export function ClearError(index: number): ErrorAction {
    return {
        type: C.CLEAR_ERROR,
        payload: index
    }
}
