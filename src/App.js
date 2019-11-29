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
