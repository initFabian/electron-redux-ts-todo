import * as React from 'react'
import { Col, Row } from 'react-bootstrap'

interface ErrorProps {
    id: number
    message: String

    onClearError(index: number): void
}

export default (props: ErrorProps) => {
    const removeErrorClick = () => {
        props.onClearError(props.id)
    }

    return (
        <Row style={{ marginLeft: 10 }}>
            <Col xs={7} style={{ color: 'red' }}>
                {props.message}
                <a href="#" onClick={removeErrorClick.bind(this)}><span className='glyphicon glyphicon-remove'></span></a>
            </Col>
        </Row>
    )
}
