const socket = io.connect('http://localhost:5500');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const form = document.getElementById('userForm');
const gameAreaDiv = document.getElementById('gameArea');

buildStadium();
let football;
let clientBalls = {};
let selfID;

socket.on('connect', () => {
    selfID = socket.id;
})

socket.on('updateConnections', player => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    if(clientBalls[player.id] === undefined){
        clientBalls[player.id] = new Capsule(player.x+35, player.y, player.x-35, player.y, 25, 10);
        clientBalls[player.id].maxSpeed = 4;
        clientBalls[player.id].score = 0;
        clientBalls[player.id].no = player.no;
        if(clientBalls[player.id].no === 1){
            clientBalls[player.id].color = "lightblue";
        } else if(clientBalls[player.id].no === 2){
            clientBalls[player.id].color = "lightgreen";
        }
        if(player.id === selfID){
            document.getElementById('playerWelcome').innerHTML =
                `Hi, enter your nickname and start to play (in room no.${player.roomNo})`
            userInput(clientBalls[player.id]);
        }
    }
})

socket.on('deletePlayer', player => {
    if(clientBalls[player.id]){
        clientBalls[player.id].remove();
        delete clientBalls[player.id];
        football.remove();
        delete football;
    }
})

socket.on('playerName', data => {
    clientBalls[data.id].name = data.name;
})

socket.on('updateFootball', footballPos => {
    if(football === undefined){
        football = new Ball(footballPos.x, footballPos.y, 20, 10);
        football.color = "red";
    } else {
        football.setPosition(footballPos.x, footballPos.y);
    }
})

socket.on('positionUpdate', playerPos => {
    for(let id in clientBalls){
        if(clientBalls[id] !== undefined && id === playerPos.id){
            clientBalls[id].setPosition(playerPos.x, playerPos.y, playerPos.angle);
        }
    }
})

socket.on('updateScore', scorerId => {
    if (scorerId === null){
        for (let id in clientBalls){
            clientBalls[id].score = 0;
        } 
    } else {
        document.getElementById('winning').innerHTML = ``;
        for (let id in clientBalls){
            if (id === scorerId){
                if(clientBalls[id].no === 1){
                    clientBalls[id].score++;
                } else if(clientBalls[id].no === 2){
                    clientBalls[id].score++;
                }
                if(clientBalls[id].score === 3){
                    document.getElementById('winning').innerHTML = 
                    `The winner is ${clientBalls[id].name}!!!
                    <br>LET'S PLAY AGAIN!`
                }
            }
        }
    }
})

requestAnimationFrame(renderOnly);

function userInterface(){
    ctx.font = "30px Arial";
    for (let id in clientBalls){
        if(clientBalls[id].no === 1){
            ctx.fillStyle = "blue";
            ctx.textAlign = "left";
            ctx.fillText(clientBalls[id].score, 30, 30);
            if(clientBalls[id].name){
                ctx.fillText(clientBalls[id].name, 30, 70);
            } else {
                ctx.fillStyle = "black";
                ctx.fillText("....", 30, 70);
            }
        } else if(clientBalls[id].no === 2){
            ctx.fillStyle = "green";
            ctx.textAlign = "right";
            ctx.fillText(clientBalls[id].score, 600, 30);
            if(clientBalls[id].name){
                ctx.fillText(clientBalls[id].name, 600, 70);
            } else {
                ctx.fillStyle = "black";
                ctx.fillText("....", 600, 70);
            }
        }
    }
}

function buildStadium(){
    new Wall(60, 80, 580, 80);
    new Wall(60, 460, 580, 460);

    new Wall(60, 80, 60, 180);
    new Wall(60, 460, 60, 360);
    new Wall(580, 80, 580, 180);
    new Wall(580, 460, 580, 360);

    new Wall(50, 360, 10, 360);
    new Wall(0, 360, 0, 180);
    new Wall(10, 180, 50, 180);
    new Wall(590, 360, 630, 360);
    new Wall(640, 360, 640, 180);
    new Wall(630, 180, 590, 180);
}

form.onsubmit = function(e) {
    e.preventDefault();
    form.style.display = 'none';
    gameAreaDiv.style.display = 'block';
    canvas.focus();
    clientBalls[selfID].name = document.getElementById('userName').value;
    socket.emit('clientName', clientBalls[selfID].name);
    return false;
}