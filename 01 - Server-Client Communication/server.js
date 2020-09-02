const express = require('express')
const app = express()
const port = 3000
const server = app.listen(port)
const io = require('socket.io')(server)

//Hello World line taken from the express website
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//The 'connection' is a reserved event name in socket.io
//For whenever a connection is established between the server and a client
io.on('connection', (socket) => {

	//Displaying a message on the terminal
    console.log('a user connected');
    //Sending a message to the client
    socket.emit('serverToClient', "Hello, client!");
    //Receiving a message from the client and putting it on the terminal
    socket.on('clientToServer', data => {
        console.log(data);
    })
    //When the client sends a message via the 'clientToClient' event
    //The server forwards it to all the other clients that are connected
    socket.on('clientToClient', data => {
        socket.broadcast.emit('serverToClient', data);
    })
    
});