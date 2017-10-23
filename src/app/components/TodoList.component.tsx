import * as React from 'react'
import TodoComponent from './Todo.component'
import { TodoType } from '../../store/types'

interface TodoListProps {
    todos: Array<TodoType>
    onUpdateTodo(id: number): void
    onRemoveTodo(id: number): void
}

export default (props: TodoListProps) => {

    const toggleTodoCompletion = (todoId: number) => {
        props.onUpdateTodo(todoId)
    }

    const removeTodoAction = (todoId: number) => {
        props.onRemoveTodo(todoId)
    }

    const todos = props.todos.map((todo, idx) => {
        const todoProps = {
            key: idx,
            id: idx,
            removeTodoAction,
            todoClickAction: toggleTodoCompletion,
            todo
        }
        return <TodoComponent {...todoProps} />
    })

    return (
        <div>
            <h1>TODOs</h1>
            <div>
                {todos}
            </div>
        </div>
    )
}
