import * as React from 'react'
import { Row } from 'react-bootstrap'
import Error from './Error.component'

interface ErrorListProps {
    messages: Array<String>
    onClearError(index: number): void
}

export default (props: ErrorListProps) => {
    const removeErrorAtIndex = (index: number) => {
        props.onClearError(index)
    }

    const errorList = props.messages.map((message: string, i: number) => {
        return <Error
            key={i}
            id={i}
            message={message}
            onClearError={removeErrorAtIndex}
        />
    })

    return (
        <Row>
            {errorList}
        </Row>
    )
}
