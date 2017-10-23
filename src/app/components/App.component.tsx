import * as React from 'react'
import TodoListContainer from '../containers/TodoList.container'
import ErrorContainer from '../containers/Error.container'
import HeaderContainer from '../containers/Header.container'
import FooterContainer from '../containers/Footer.container'

export default (props) => (
    <div style={{ marginLeft: 10 }}>
        <ErrorContainer />
        <HeaderContainer />
        <TodoListContainer />
        <FooterContainer />
    </div>
)
