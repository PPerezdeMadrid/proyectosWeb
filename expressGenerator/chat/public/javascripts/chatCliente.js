const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const message = document.getElementById('messages');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(input.value){
        socket.emit('chat', input.value); //Si hay un valor input --> lo envía por el socket a TODOS
        input.value='';
    }
});

socket.on('chat', (msg)=>{ // Escuchar mensajes
    console.log('mensaje recibido');
    const item = document.createElement("li");
    item.textContent = msg;
    messages.append(item);
    /*
    - Crea un nuevo elemento <li>
    - Le asigna el mensage msg como contenido
    */
});
