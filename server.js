const express = require('express');
const app = express();
const server = app.listen(5500);
const io = require('socket.io')(server);

app.get('/', (req, res) => res.send('Hello World!'))

let players = {};

io.on('connection', connected);

//listening to events after the connection is estalished
function connected(socket){
    socket.on('newPlayer', data => {
        console.log("New client connected, with id: "+socket.id);
        players[socket.id] = data;
        console.log("Starting position: "+players[socket.id].x+" - "+players[socket.id].y);
        console.log("Current number of players: "+Object.keys(players).length);
        console.log("players dictionary: ", players);
        io.emit('updatePlayers', players);
    })
    socket.on('disconnect', function(){
        delete players[socket.id];
        console.log("Goodbye client with id "+socket.id);
        console.log("Current number of players: "+Object.keys(players).length);
        io.emit('updatePlayers', players);
    })
    socket.on('ClientClientHello', data => {
        socket.broadcast.emit('ServerClientHello', data);
    })
}