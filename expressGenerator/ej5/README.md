# Teoría Chats en Node

```bash
npm install socket.io
```

## Enviar un mensaje:
```javascript
socket.emit("esto es un mensaje");
```

## Enviar un mensaje a todos los clientes conectados:
```javascript
io.emit("esto es un mensaje para todos");
```

### Enviar un mensaje a todos menos a mi (broadcast):
```javascript
socket.broadcast.emit("esto es un mensaje para todos");
```

### Para poder visualizar la sesión desde socket:
```bash
npm install express-socket.io-session
```

[!Chat a todos](./chat_a_todos.jpg)
[!Chat nombre de usuario](./chat_username_msg.jpg)