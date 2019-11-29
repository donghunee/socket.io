import React from 'react';
import socket from './socket'

class ChatForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = { 
            name: '' , 
            message: ''
        }
    }

    nameChanged = (e) => {
        this.setState({name: e.target.value})
    }

    messageChanged = (e) => {
        this.setState({ message: e.target.value})
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
          this.send()
        }
      }

    send = () => {
        socket.emit('chat-msg', {
            name: this.state.name,
            message: this.state.message
        })
        this.setState({message: ''})
    }
    render() {
        return (
            <div>
                <span>닉네임 : </span>
                <input 
                onChange={this.nameChanged}
                value={this.state.name}/>
                <span> 내용 : </span>
                <input 
                onChange={this.messageChanged}
                onSubmit={this.send}
                onKeyPress={this.handleKeyPress}
                value={this.state.message}/>

                <button onClick={this.send} >입력</button>
            </div>
        )
    }
}

export default ChatForm
