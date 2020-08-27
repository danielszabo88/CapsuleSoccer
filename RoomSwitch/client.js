//Establishing a connection with the server on port 5500
const socket = io.connect("http://localhost:5500/");

//Grabbing the button elements by the ID
const switchBtn = document.getElementById('switchButton');
const sendNameBtn = document.getElementById('sendName');

//Declaring the client room and the username variables
let clientRoom;
let userName;

//Once connected, client gets client number and room number from the server
socket.on('serverMsg', data => {
    console.log(`I am client no.${data.clientNo}`);
    console.log(`I should be in room no.${data.roomNo}`);
    clientRoom = data.roomNo;
})

//Server sends this to the room where the client is
//No data included, just a permit to change the bg color
socket.on('switchFromServer', () => {
    if (document.body.style.background === "white" || document.body.style.background === ""){
        document.body.style.background = "darkgray";
    } else {
        document.body.style.background = "white";
    }
})

//Event listener on the switch button element
//Sends the client's room number to the server when clicked
switchBtn.addEventListener('click', () => {
    socket.emit('buttonPressed', clientRoom);
})

//Event listener on the username button element
//Sends a message to the server when clicked
sendNameBtn.addEventListener('click', () => {
    //Giving a value to the userName variable 
    //Unknown if user didn't enter anything
    userName = document.getElementById('name').value;
    if (userName === ''){
        userName = "(unknown)";
    }

    //Making the first div invisible, the second div visible
    let userNameDiv = document.getElementById('userName');
    let switchAreaDiv = document.getElementById('switchArea');
    userNameDiv.style.display = 'none';
    switchAreaDiv.style.display = 'block';

    //Including some info between the second div's <p> tags
    document.getElementById('userInfo').innerHTML = `
            You are switching as ${userName}
            <br>
            In the room ${clientRoom}
        `;    
})