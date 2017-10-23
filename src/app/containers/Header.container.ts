import { connect, Dispatch } from 'react-redux'
import { AddTodo } from '../../store/actions/todo.action'
import Header from '../components/Header.component'

const mapStateToProps = (state, props) => ({})

function mapDispatchToProps<T>(dispatch: Dispatch<T>) {
    return {
        onAddTodo(title: string) {
            dispatch(
                AddTodo(title)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
