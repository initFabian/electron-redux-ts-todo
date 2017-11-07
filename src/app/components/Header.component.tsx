import * as React from 'react'
import { Button } from 'react-bootstrap'
import { ipcRenderer } from 'electron'

interface HeaderComponentProps {
    onAddTodo(string): void
    onShowFeedUrl(feedUrl: string)
}

export default (props: HeaderComponentProps) => {
    let textInput: HTMLInputElement
    const handleClick = () => {
        props.onAddTodo(textInput.value)
        textInput.value = ''
    }

    ipcRenderer.on('FEED_URL', function (event, feedURL) {
        props.onShowFeedUrl(`feedURL: ${feedURL}`)
    })

    const getFeedUrl = () => {
        ipcRenderer.send('GET_FEED_URL')
    }

    return (
        <div>
            <Button bsStyle="success" bsSize="small" onClick={getFeedUrl.bind(this)}>
                Get FeedURL
            </Button>
            <h1>Add TODO</h1>
            <input type="text" ref={input => textInput = input!} />
            <Button bsStyle="success" bsSize="small" onClick={handleClick.bind(this)}>
                Add
            </Button>
        </div>
    )
}
