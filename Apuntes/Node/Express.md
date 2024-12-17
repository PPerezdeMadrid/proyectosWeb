# Express con el template de EJS

## Conocimientos Básicos
### **1. Instalación y configuración básica**:
1. **Generar un proyecto Express con EJS**:

   ```bash
   npm install express-generator #sudo si no funciona
   express -v ejs mi-proyecto
   cd mi-proyecto
   npm install
   ```
Alternativa: `npx express-generator -v ejs mi-proyecto`

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

### **2. Configurar EJS como motor de plantillas**:
En el archivo **`app.js`** (o el archivo principal de la aplicación), Express ya estará configurado para usar **EJS** por defecto. Esto se ve en la siguiente línea:

```javascript
app.set('view engine', 'ejs');
```

### **3. Crear vistas con EJS**:
- Las vistas deben guardarse en la carpeta **`views/`**.
- Los archivos de vista deben tener la extensión **`.ejs`**.

Ejemplo de vista (en **`views/index.ejs`**):

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title><%= title %></title>
</head>
<body>
  <h1><%= message %></h1>
</body>
</html>
```

### **4. Rutas en Express con EJS**:
En **`app.js`**, configura las rutas para renderizar las vistas EJS.

```javascript
app.get('/', (req, res) => {
  res.render('index', { title: 'Página Principal', message: '¡Hola, mundo!' });
});
```

### **5. Pasar datos a las vistas**:
Usa objetos para pasar variables a las vistas. Por ejemplo:

```javascript
app.get('/user', (req, res) => {
  res.render('user', { username: 'Juan', age: 25 });
});
```

### **6. Estructura básica del proyecto**:
```bash
mi-proyecto/
├── app.js        # Archivo principal del servidor
├── views/        # Carpeta donde se almacenan las vistas
│   ├── index.ejs
│   └── user.ejs
├── public/       # Archivos estáticos (CSS, JS, imágenes)
├── routes/       # Rutas de la aplicación
└── package.json  # Información del proyecto
```

### **7. Iniciar el servidor**:
Para iniciar el servidor:

```bash
npm start
```

Esto iniciará el servidor en `http://localhost:3000`.

---
## Base de Datos (estilo examen)
En database/model/user.model.js:
```javascript
const bcrypt = require('bcrypt');

users = {};

users.data = {};

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = function (username, password){
    //TODO Añadir comprobaciones sobre username y password
    if(users.data.hasOwnProperty(username)){
        throw new Error (`Ya existe el usuario ${username}.`);
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error (`Error al generar el hash de ${username}.`);
        }
        users.data[username] = {username, hash, last_Login: new Date().toISOString}
    });
}

users.isLoginRight = async function(username,password){
    if(!users.data.hasOwnProperty(username)){
        return false;
    }
    return await users.comparePass(password, users.data[username].hash);
}

module.exports = users;
```
¿Cómo accedo a los datos de un usuario desde una página cualquiera?
```javascript
const database = require('../database');

// Ejemplo para obtener los datos de un usuario
let username = 'juan'; 

if (database.data.hasOwnProperty(username)) {
  console.log(database.data[username]); // Muestra los datos del usuario
} else {
  console.log(`El usuario ${username} no existe.`);
}
```

¿Cómo añado un nuevo campo, por ejemplo "acceptedCookies"?
```javascript
// Función para añadir el campo "acceptedCookies" a un usuario y establecerlo como true
users.acceptCookies = function(username) {
    // Verificar si el usuario existe
    if (users.data.hasOwnProperty(username)) {
        // Cambiar el valor de acceptedCookies a true
        users.data[username].acceptedCookies = true;
    } else {
        throw new Error(`El usuario ${username} no existe.`);
    }
}

// ------------ ejemplo de uso ------------
// app.js
const database = require('./database');
app.post('/guardar-info-cookies', (req, res) => {
  req.session.cookieAccepted = true;
  console.log("El usuario ha aceptado las cookies");
  console.log(req.session.user);
  if(req.session.user){
    // Guardar en su perfil que ha aceptado las cookies
    username = req.session.user.username;
    console.log(`Nombre de Usuario: ${username}`);
    database.user.saveCookie(username);
  }
  res.json({ success: true }); // Respuesta JSON IMP

});
```


¿Cómo creo una función que revise los campos?
Por ejemplo, sacar el valor de las cookies de un usuario:
```javascript
// Función para obtener el estado de 'acceptedCookies' de un usuario
users.getAcceptedCookies = function(username) {
    // Verificar si el usuario existe
    if (users.data.hasOwnProperty(username)) {
        // Si el campo 'acceptedCookies' existe, devolver su valor
        if (users.data[username].hasOwnProperty('acceptedCookies')) {
            return users.data[username].acceptedCookies;
        } else {
            // Si el campo no existe, devolver un mensaje o valor predeterminado
            return `El usuario ${username} no ha aceptado las cookies aún.`;
        }
    } else {
        throw new Error(`El usuario ${username} no existe.`);
    }
}

// Ejemplo de uso:
// Suponiendo que se llama a la función con el nombre de usuario que se pasa por la URL o algún otro medio
let username = 'juan';
try {
    let result = users.getAcceptedCookies(username);
    console.log(result); // Mostrará si el usuario aceptó las cookies o si no las ha aceptado
} catch (error) {
    console.error(error.message); // En caso de error (usuario no existe)
}

```

Ejemplo de validación en el registro: 
El username tenga dos palabras y el password tenga al menos una mayúscula, números y algún símbolo:
```javascript
// Función de registro con validaciones
users.register = function (username, password) {
    // Validación para el username: debe contener al menos dos palabras
    const usernameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/; // Expresión regular para validar dos palabras
    if (!usernameRegex.test(username)) {
        throw new Error("El nombre de usuario debe contener al menos dos palabras.");
    }

    // Validación para el password: al menos una mayúscula, un número y un símbolo
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'|,.<>?/]).+$/; // Expresión regular para validar los requisitos
    if (!passwordRegex.test(password)) {
        throw new Error("La contraseña debe contener al menos una mayúscula, un número y un símbolo.");
    }

    // Comprobar si el usuario ya existe
    if (users.data.hasOwnProperty(username)) {
        throw new Error(`Ya existe el usuario ${username}.`);
    }

    // Generar el hash de la contraseña
    users.generateHash(password, function (err, hash) {
        if (err) {
            throw new Error(`Error al generar el hash de ${username}.`);
        }
        // Registrar al usuario con su hash y fecha de último login
        users.data[username] = { username, hash, last_Login: new Date().toISOString() };
    });
}
```

---
## Async y Await
Permiten manejar operaciones asíncronas de una manera más sencilla y legible que las tradicionales promesas (promises) o callbacks.
El manejo de errores en funciones asíncronas con async y await se realiza mediante los bloques `try-catch`, lo que permite capturar cualquier error que ocurra durante la ejecución de operaciones asíncronas.
- try: Dentro de este bloque, colocas el código que puede generar un error (como una llamada a una API o una operación asíncrona).
- catch: Si algún error ocurre dentro del bloque try, el bloque catch lo captura y permite manejarlo de manera controlada

```javascript
// Función de login asíncrona
users.isLoginRight = async function(username, password){
    if(!users.data.hasOwnProperty(username)){
        return false; // El usuario no existe
    }
    const hash = users.data[username].hash;
    return await users.comparePass(password, hash);
}

//----------Ejemplo de uso----------
// Ruta de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Llamada asíncrona para verificar si las credenciales son correctas
        const isValid = await users.isLoginRight(username, password);

        if (isValid) {
            res.json({ success: true, message: 'Login exitoso' });
        } else {
            res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});
```



---
## Login y Register

Routes/login:
```javascript
const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { user: req.session.user});
});

router.post('/', async function(req, res, next) {
  const user = req.body.user;
  //Comprobación si el usuario es correcto
  if(await database.users.isLoginRight(user, req.body.pass)){
    req.session.message = "¡Login correcto!";
    req.session.user = {username: user};
    res.redirect('restricted');
  } else {
    req.session.error = "Usuario o contraseña incorrectas";
    res.redirect('login');
  }
});

module.exports = router;
```

Routes/register:
```javascript
const express = require('express');
const router = express.Router();
const database = require('../database'); // Importamos la base de datos

// GET para mostrar el formulario de registro
router.get('/', function(req, res, next) {
  res.render('register', { user: req.session.user });
});

// POST para manejar el registro de un nuevo usuario
router.post('/', async function(req, res, next) {
  const { username, password } = req.body;

  try {
    // Intentar registrar al usuario
    await database.users.register(username, password);
    
    // Si el registro es exitoso, se puede redirigir a login
    req.session.message = "¡Registro exitoso! Ahora puedes iniciar sesión.";
    res.redirect('login');
  } catch (error) {
    // Si ocurre un error (por ejemplo, si el usuario ya existe)
    req.session.error = error.message;
    res.redirect('register');
  }
});

module.exports = router;

```
---
## Fecth de GET y POST
Ejemplo sencillo de como hacer un GET y un POST con fetch

En app.js:
```javascript
// Ruta GET para 'get-op'
app.get('/get-operation', (req, res) => {
  res.json({ message: 'Respuesta desde el servidor con GET en get-op!' });
});

// Ruta POST para 'get-op'
app.post('/post-operation', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hola, ${name}, desde el servidor con POST en get-op!` });
});
```
views/index.ejs:
```html
<body>
  <h1>Ejemplo Fetch con GET y POST</h1>
  
  <!-- Botón para obtener datos con GET -->
  <button id="getDataBtn">Obtener Datos con GET</button>
  
  <h3>Enviar Datos con POST</h3>
  <!-- Formulario para el POST -->
  <input type="text" id="nameInput" placeholder="Escribe tu nombre">
  <button id="postDataBtn">Enviar Datos con POST</button>

  <script>
    // GET request sin async/await
    document.getElementById('getDataBtn').addEventListener('click', function() {
      fetch('/get-operation')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          alert(data.message); // Muestra el mensaje del servidor
        })
        .catch(function(error) {
          console.error('Error en la petición GET:', error);
        });
    });

    // POST request sin async/await
    document.getElementById('postDataBtn').addEventListener('click', function() {
      const name = document.getElementById('nameInput').value; // Obtener el valor del input
      if (!name) {
        alert('Por favor, ingresa tu nombre.');
        return;
      }

      fetch('/post-operation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }), // Enviar el nombre desde el input
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          alert(data.message); // Muestra el mensaje del servidor
        })
        .catch(function(error) {
          console.error('Error en la petición POST:', error);
        });
    });
  </script>
```

También podemos hacerlo con parámatros. Por ejemplo `/delete/1`:
En app.js:
```javascript
// Ruta DELETE para 'delete/:id'
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params; // Obtener el id desde la URL
  res.json({ message: `Recurso con ID ${id} eliminado.` });
});
```

En view ejs:
```html
 <h3>Eliminar Recurso</h3>
  <!-- Formulario para eliminar un recurso -->
  <input type="text" id="deleteIdInput" placeholder="ID del recurso a eliminar">
  <button id="deleteDataBtn">Eliminar Recurso</button>

<script>
     // DELETE request sin async/await
    document.getElementById('deleteDataBtn').addEventListener('click', function() {
      const id = document.getElementById('deleteIdInput').value; // Obtener el valor del input
      if (!id) {
        alert('Por favor, ingresa el ID del recurso a eliminar.');
        return;
      }

      fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          alert(data.message); // Muestra el mensaje del servidor
        })
        .catch(function(error) {
          console.error('Error en la petición DELETE:', error);
        });
</script>

```
