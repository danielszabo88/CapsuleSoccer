//Establishing a connection with the server on port 5500
const socket = io.connect('http://localhost:5500');

//Grabbing the button element by the ID
const HelloBtn = document.getElementById('helloButton');

//Callback function fires on the event called 'ServerClientHello'
socket.on('ServerClientHello', data => {
    alert(data);
})

//Client sends a message at the moment it got connected with the server
socket.emit('ClientServerHello', "Client say hello to server");

//Event listener on the button element: sends a message to the server when clicked
HelloBtn.addEventListener('click', () => {
    socket.emit('ClientClientHello', "Hello to the other clients!!");
})