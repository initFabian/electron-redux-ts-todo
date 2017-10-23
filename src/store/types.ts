export interface TodoType {
    completed: boolean
    title: string
}

export interface StoreState {
    todos: Array<TodoType>
    filter: {
        isCompleted: boolean
    }
    errors: Array<String>
}
