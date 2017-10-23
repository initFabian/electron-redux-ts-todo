import * as React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TodoType } from '../../store/types'

interface TodoComponentProps {
    key: number
    id: number
    todo: TodoType
    todoClickAction(number): void
    removeTodoAction(number): void
}

interface TodoComponentState {
    showTrashBin: boolean
}
export default class TodoComponent extends React.Component<TodoComponentProps, TodoComponentState> {
    constructor(props) {
        super(props)
        this.showTrashBin = this.showTrashBin.bind(this)
        this.onClickAction = this.onClickAction.bind(this)
        this.hideTrashBin = this.hideTrashBin.bind(this)
        this.onRemoveAction = this.onRemoveAction.bind(this)
        this.state = {
            showTrashBin: false
        }

    }

    onClickAction(e) {
        e.preventDefault()
        this.props.todoClickAction(this.props.id)
    }

    onRemoveAction() {
        this.props.removeTodoAction(this.props.id)
    }

    showTrashBin() {
        this.setState({
            showTrashBin: true
        })
    }
    hideTrashBin() {
        this.setState({
            showTrashBin: false
        })
    }

    render() {

        const isCompleted = () => {
            const completed = <span className='glyphicon glyphicon-ok'></span>
            const notCompleted = <span className='glyphicon glyphicon-remove'></span>
            return (this.props.todo.completed) ? completed : notCompleted
        }

        const style = {
            color: (this.props.todo.completed) ? 'green' : 'red'
        }

        const trashBin = () => {
            let bin = (
                <span
                    className='glyphicon glyphicon-trash col-xs-1 pull-left'
                    style={{ color: 'black' }}
                    onClick={this.onRemoveAction}
                ></span>
            )
            return (this.state.showTrashBin) ? bin : ''
        }

        return (
            <Row>
                <Col xs={12} style={style}
                    onMouseEnter={this.showTrashBin}
                    onMouseLeave={this.hideTrashBin}
                >
                    {trashBin()}<p className='col-xs-11' onClick={this.onClickAction}>title: {this.props.todo.title} {isCompleted()}</p>
                </Col>
            </Row>
        )
    }
}
