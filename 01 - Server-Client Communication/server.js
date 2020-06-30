//Importing the express module
const express = require('express')
const app = express()
const server = app.listen(5500);
//Importing the socket.io module
const io = require('socket.io')(server);


//Hello World line taken from the express website
app.get('/', (req, res) => res.send('Hello World!'))

//The 'connection' is a reserved event name in socket.io
//For whenever a connection is established between the server and a client
io.on('connection', connected);

//Defining the connected function that runs upon the 'connection' event
function connected(socket){
	//Displaying a message on the terminal
    console.log("A new client is connected");
    //Sending a message to the client
    socket.emit('ServerClientHello', "Server says hello to client");
    //Receiving a message from the client and putting it on the terminal
    socket.on('ClientServerHello', data => {
        console.log(data);
    })
    //When the client sends a message via the 'ClientClientHello' event
    //The server forwards it to all the other clients that are connected
    socket.on('ClientClientHello', data => {
        socket.broadcast.emit('ServerClientHello', data);
    })
}