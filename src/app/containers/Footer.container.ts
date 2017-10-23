import { connect, Dispatch } from 'react-redux'
import { SetVisibilityFilter } from '../../store/actions/todo.action'
import Footer from '../components/Footer.component'

interface FooterState {
    filter: {
        isCompleted: boolean
    }
}

const mapStateToProps = (state: FooterState) => ({
    isCompleted: state.filter.isCompleted || false
})

function mapDispatchToProps<T>(dispatch: Dispatch<T>) {
    return {
        onUpdateFilter() {
            dispatch(
                SetVisibilityFilter()
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
