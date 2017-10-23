import { connect, Dispatch } from 'react-redux'
import { ClearError } from '../../store/actions/error.action'
import ErrorList from '../components/ErrorList.component'

interface ErrorListState {
    errors: Array<String>
}

const mapStateToProps = (state: ErrorListState) => ({
    messages: state.errors
})

function mapDispatchToProps<T>(dispatch: Dispatch<T>) {
    return {
        onClearError(index: number) {
            dispatch(
                ClearError(index)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorList)
