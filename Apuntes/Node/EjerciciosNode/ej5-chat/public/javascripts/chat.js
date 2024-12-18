const socket = io();

const chatForm = document.getElementById('chat-form');
const messages = document.querySelector('.imprimir-mensajes');
const input_mensaje = document.getElementById('message');
const username = document.getElementById('username').textContent;

// Enviar mensaje al servidor
chatForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const message = document.getElementById('message').value;
    const user_message = `${username}: ${message}`

    // Enviar el mensaje al servidor
    socket.emit('chat', user_message );

    // Limpiar el campo de mensaje
    document.getElementById('message').value = '';
});

// Escuchar el mensaje desde el servidor
socket.on('chat', ({ msg }) => {
    console.log(`Mensaje recibido desde frontend: ${msg}`);

    const item = document.createElement("li");
    const messageDiv = document.createElement("div");

    if (msg.startsWith(username)) { 
        item.classList.add('user-login');
        messageDiv.classList.add('mensaje-mio')
    }else{
        item.classList.add('user-otro');
        messageDiv.classList.add('mensaje-otro');
    }
    messageDiv.textContent = msg; 
    item.appendChild(messageDiv);

    messages.appendChild(item);
});
