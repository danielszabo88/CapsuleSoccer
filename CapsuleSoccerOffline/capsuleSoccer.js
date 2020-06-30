//STEP 1: setting up the environment
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//
// creating the starting objects and variables here before starting the main loop
// for example: 
let player1 = new Capsule(80, 270, 150, 270, 25, 10);
player1.maxSpeed = 4;
let player2 = new Capsule(560, 270, 490, 270, 25, 10);
player2.maxSpeed = 4;
let football = new Ball(320, 270, 15, 6);
player1.score = 0;
player2.score = 0;

buildStadium();

ctx.font = "30px Arial";

//STEP 2: defining the game logic
function gameLogic(){
    if(football.pos.x < 45){
        scoring(player2)
    }
    if(football.pos.x > 595){
        scoring(player1)
    }
    if(player1.score === 3 || player2.score === 3){
        gameOver();
    }
    ctx.fillText(player1.score, 20, 30);
    ctx.fillText(player2.score, 600, 30);
}

//STEP 3: handling the user input and the game loop
userInput1(player1);
userInput2(player2);
requestAnimationFrame(mainLoop);

function scoring(player){
    player.score++;
    player1.vel.set(0, 0);
    player1.angVel = 0;
    player1.setPosition(100, 270, 0);
    player2.vel.set(0, 0);
    player2.angVel = 0;
    player2.setPosition(540, 270, 0);
    football.vel.set(0, 0);
    football.setPosition(320, 270);
}

function gameOver(){
    ctx.fillText("GAME OVER", 250, 30);
    player1.vel.set(0, 0);
    player1.angVel = 0;
    player1.setPosition(100, 270, 0);
    player2.vel.set(0, 0);
    player2.angVel = 0;
    player2.setPosition(540, 270, 0);
    football.vel.set(0, 0);
    football.setPosition(320, 270);
    setTimeout(() => {
        player1.score = 0;
        player2.score = 0;
    }, 2000)
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