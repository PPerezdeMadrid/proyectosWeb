const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const username = document.getElementById('username');


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(input.value){
        console.log(`soy ${username.textContent}`);
        socket.emit('chat', `${username.textContent}: ${input.value}`);
        input.value = '';
    }
});

// ESCUCHAR 
socket.on(`chat` , ({msg})=> { // imp: ({msg}) sí (json), (msg) NO!!
    //Recibo mensaje --> lo imprimo
    console.log(`Mensaje recibido desde frontend: ${msg}`);
    const item = document.createElement("li");
    // item.textContent = `${data.username}: ${data.msg}`;
    item.textContent = msg;
    messages.appendChild(item);
});