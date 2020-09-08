const socket = io.connect('http://localhost:5500');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let clientBalls = {};
let selfID;

putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);

socket.on('connect', () => {
    selfID = socket.id;
    let startX = 40+Math.random()*560;
    let startY = 40+Math.random()*400;
    clientBalls[socket.id] = new Capsule(startX, startY, startX+40, startY, 40, 5);
    clientBalls[socket.id].player = true;
    clientBalls[socket.id].maxSpeed = 5;
    userInput(clientBalls[socket.id]);
    socket.emit('newPlayer', {x: startX, y: startY});
})

socket.on('updatePlayers', players => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    playersFound = {};
    for(let id in players){
        if(clientBalls[id] === undefined && id !== socket.id){
            clientBalls[id] = new Capsule(players[id].x, players[id].y, players[id].x+40, players[id].y, 40, 5);
            clientBalls[id].maxSpeed = 5;
        }
        playersFound[id] = true;
    }
    for(let id in clientBalls){
        if(!playersFound[id]){
            clientBalls[id].remove();
            delete clientBalls[id];
        }
    }
})

socket.on('positionUpdate', playerPos => {
    for(let id in playerPos){
        if(clientBalls[id] !== undefined){
            clientBalls[id].setPosition(playerPos[id].x, playerPos[id].y, playerPos[id].angle);
        }
    }
})

requestAnimationFrame(renderOnly);