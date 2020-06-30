//Event listeners for the arrow keys
function userInput1(obj){
    canvas.addEventListener('keydown', function(e){
        if(e.keyCode === 37){
            obj.left = true;
        }
        if(e.keyCode === 38){
            obj.up = true;
        }
        if(e.keyCode === 39){
            obj.right = true;
        }
        if(e.keyCode === 40){
            obj.down = true;
        }
        if(e.keyCode === 32){
            obj.action = true;
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
    });    
}

function userInput2(obj){
    canvas.addEventListener('keydown', function(e){
        if(e.keyCode === 65){
            obj.left = true;
        }
        if(e.keyCode === 87){
            obj.up = true;
        }
        if(e.keyCode === 68){
            obj.right = true;
        }
        if(e.keyCode === 83){
            obj.down = true;
        }
        if(e.keyCode === 9){
            obj.action = true;
        }
    });
    
    canvas.addEventListener('keyup', function(e){
        if(e.keyCode === 65){
            obj.left = false;
        }
        if(e.keyCode === 87){
            obj.up = false;
        }
        if(e.keyCode === 68){
            obj.right = false;
        }
        if(e.keyCode === 83){
            obj.down = false;
        }
        if(e.keyCode === 9){
            obj.action = false;
        }
    });    
}