const socket = io.connect('http://localhost:5500');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let clientBalls = {};

//setting up the environment
putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);
let startX = 40+Math.random()*560;
let startY = 40+Math.random()*400;
let playerBall = new Ball(startX, startY, 40, 5);
playerBall.player = true;
playerBall.maxSpeed = 5;

//sending the initial positions to the server
socket.emit('newPlayer', {x: startX, y: startY});
//reacting for new and disconnecting clients
socket.on('updatePlayers', players => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    playersFound = {};
    for(let id in players){
        if(clientBalls[id] === undefined && id !== socket.id){
            clientBalls[id] = new Ball (players[id].x, players[id].y, 40, 5);
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

function gameLogic(){
    socket.emit('update', {x: playerBall.pos.x, y: playerBall.pos.y});
}

userInput(playerBall);
requestAnimationFrame(mainLoop);