import * as React from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

interface FooterProps {
    isCompleted: boolean
    onUpdateFilter(): void;
}

export default (props: FooterProps) => {
    const onClickAction = (e: React.FormEventHandler<ToggleButton>) => {
        props.onUpdateFilter()
    }
    const value = (props.isCompleted) ? 'completed' : 'all'

    return (
        <ToggleButtonGroup type="checkbox" defaultValue={value}>
            <ToggleButton value='completed' onChange={onClickAction.bind(this)}>Completed</ToggleButton>
        </ToggleButtonGroup>
    )
}
