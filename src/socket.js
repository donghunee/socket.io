import socketio from 'socket.io-client'

const socket = socketio.connect('http://bb4e0dc8.ngrok.io/')

export default socket