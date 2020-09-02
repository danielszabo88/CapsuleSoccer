//Establishing a connection with the server on port 5500y
const socket = io('http://localhost:3000');

//Grabbing the button element by the ID
const HelloBtn = document.getElementById('helloButton');

//Callback function fires on the event called 'serverToClient'
socket.on('serverToClient', (data) => {
    alert(data);
})

//Client sends a message at the moment it got connected with the server
socket.emit('clientToServer', "Hello, server!");

//Event listener on the button element: sends a message to the server when clicked
HelloBtn.addEventListener('click', () => {
    socket.emit('clientToClient', "Hello to the fellow clients!");
})