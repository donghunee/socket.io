# socket

```js
//App.js

import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatForm from './ChatForm'

import socket from './socket'

class App extends React.Component {

    state = {
        logs: [] // 전체 대화 내용
    }

    componentDidMount() { 
        socket.on('chat-msg', (obj) => {
            const logs2 = this.state.logs
            obj.key = 'key-' + (this.state.logs.length + 1)
            logs2.unshift(obj)
            this.setState({logs: logs2})
        })
    }       

    render() {
        const messages = this.state.logs.map(e => (
            <div key={e.key}>
                <span>{e.name}  :  </span>
                <span>{e.message}</span>
            </div>
        ))
        return (
            <div>
                <ChatForm />
                <div>{messages}</div>
            </div>
        )
    }

}

export default App;


```

```js
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

```

```js
import socketio from 'socket.io-client'

const socket = socketio.connect('https://reactsocketiomo.herokuapp.com/')

export default socket
```
