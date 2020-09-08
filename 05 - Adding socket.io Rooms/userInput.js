let justPressed = false;

//Event listeners for the arrow keys
function userInput(obj){
    canvas.addEventListener('keydown', function(e){
        if(e.keyCode === 37){
            if(obj.left === false){
                justPressed = true;
            }
            obj.left = true;
        }
        if(e.keyCode === 38){
            if(obj.up === false){
                justPressed = true;
            }
            obj.up = true;
        }
        if(e.keyCode === 39){
            if(obj.right === false){
                justPressed = true;
            }
            obj.right = true;
        }
        if(e.keyCode === 40){
            if(obj.down === false){
                justPressed = true;
            }
            obj.down = true;
        }
        if(e.keyCode === 32){
            if(obj.action === false){
                justPressed = true;
            }
            obj.action = true;
        }
        if (justPressed === true){
            emitUserCommands(obj);
            justPressed = false;
        }
    });
    
    canvas.addEventListener('keyup', function(e){
        if(e.keyCode === 37){
            obj.left = false;
        }
        if(e.keyCode === 38){
            obj.up = false;
        }
        if(e.keyCode === 39){
            obj.right = false;
        }
        if(e.keyCode === 40){
            obj.down = false;
        }
        if(e.keyCode === 32){
            obj.action = false;
        }
        emitUserCommands(obj);
    });    
}

function emitUserCommands(obj){
    let userCommands = {
        left: obj.left,
        up: obj.up,
        right: obj.right,
        down: obj.down,
        action: obj.action
    }
    socket.emit('userCommands', userCommands);
}
