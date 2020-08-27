const express = require('express')
const app = express()
const server = app.listen(5500);
const io = require('socket.io')(server);

//Hello World line taken from the express website
app.get('/', (req, res)  => res.send('Hello World!'));

//Declaring the client number and room number variables
let clientNo = 0;
let roomNo;

//Calling the connected function once the connection is estalished
io.on('connection', connected);

//Defining the connected function
function connected(socket){
    clientNo++;
    //Room number is calculated based on the client number
    roomNo = Math.round(clientNo / 2);
    //Server puts client in a room with the room number as its name 
    socket.join(roomNo);
    //Server emits to the client its client number and room nomber
    socket.emit('serverMsg', {clientNo: clientNo, roomNo: roomNo});

    //Listening to the buttonPressed event from the client
    //Client sends its room number as for data
    socket.on('buttonPressed', clientRoom => {
        //Emitting a message to the room with the name of (clientRoom) ONLY
        //The clients receiving this will change the background color
        io.to(clientRoom).emit('switchFromServer');
    })
}