# Simulacro 3

## Apartado 1
De momento no tenemos del todo claro cuál va a ser el nombre definitivo de la tienda y ahora
mismo lo tenemos hardcodeado en cada ruta. Si quisiéramos cambiar el nombre tendríamos que
modificar esos archivos y cualquier futura ruta que creemos. Modifique la aplicación para definir en
un único sitio el nombre de la tienda (ahora mismo “Embutidos León”), que este sea accesible en las
vistas y elimine el nombre que aparece ahora en las rutas.

Propuesta: utlizar una variable **local**

- app.js
 ```javascript
 const TITLE = process.env.TITLE || "Embutidos León" // Opcional, para pasarlo por la terminal
 app.locals.TITLE = TITLE; 
 ```
- Luego podremos utilizarlo **directamente** en el ejs, por ejemplo:
```html
<h1>Bienvenido a <%= TITLE %></h1>
<!-- No tienes q pasarlo como res.render{title: "Embutidos León"} -->
```

---
## Apartado 2
Hay una cuestión muy importante a la que nos obliga la normativa europea y es sobre el uso de cookies en la web. Tenemos que informar al usuario de que estamos usando cookies en nuestra página y que las acepte. Para ello complete las siguientes tareas:

1. Cree una sección que aparezca en la parte inferior de todas las páginas con las siguientes
características visuales:
- Que aparezca un título con un mensaje informando al usuario del uso de cookies.
- Que tenga un botón de aceptar y otro de rechazar.
- Que ocupe todo el ancho de la pantalla, tenga el texto y los botones centrados y que esté por encima de cualquier contenido que haya en la página. Tiene que estar siempre visible.
- Usa CSS puro para crear esta sección, no uses ningún framework.
```html
<style>
    .cookies-banner{
        background-color: lightgray;
        padding: 2% 2%;
        text-align: center;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
<section class="cookies-banner">
    <h1> Uso de Cookies </h1>
    <p> Nos vemos obligados a informarte del uso de cookies necesarias para que funcione esta aplicación web</p>
    <div class="botones-cookies">
        <button> Aceptar </button>
        <button> Cancelar </button>
    </div>
</section>
```

2. Si el usuario le da a cancelar, redirígele a la página de google.es.
```html
<style>
.cookies-banner a{
        text-decoration: none;
        color:black;
    }
</style>
<button><a href="http://www.google.com">Cancelar</a></button>
```

3. Si el usuario acepta las cookies, realice lo siguiente:
- Cierre el mensaje.
```html
<section class="cookies-banner" id="cookies">
    <button onclick="aceptarCookies()"> Aceptar </button>
<script>
        const banner = document.getElementById("cookies-banner");
        function aceptarCookies(){
            banner.style.display = "none";
        }
</script>
```
- Guarde información en la sesión para que, si sigue visitando otras páginas, no se vuelva a mostrar el mensaje.
```html
<% if (cookieAccepted) { %>
    <p> <span id="cookieInfo">Cookies True <%= (cookieAccepted) %> </span></p>
<% }else { %>
    <p> <span id="cookieInfo"> Cookies False <%= (cookieAccepted) %> </span></p>
    <section class="cookies-banner" id="cookies-banner" style="display:inline">
        <h1> Uso de Cookies </h1>
        <p> Nos vemos obligados a informarte del uso de cookies necesarias para que funcione esta aplicación web</p>
        <div class="botones-cookies">
            <button onclick="aceptarCookies()"> Aceptar </button>
            <button><a href="http://www.google.com">Cancelar</a></button>
        </div>
        <script>
            const banner = document.getElementById("cookies-banner");

            function aceptarCookies(){
                fetch('/guardar-info-cookies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Preferencia de cookies guardada:', data); // Se procesa respuesta JSON
                    banner.style.display = "none";

                })
                .catch(error => {
                    console.error('Error al guardar la preferencia de cookies:', error);
                });

            }

        </script>
    </section>
```
En app.js: 
```javascript
app.post('/guardar-info-cookies', (req, res) => {
  req.session.cookieAccepted = true;
  console.log("El usuario ha aceptado las cookies");
  res.json({ success: true }); // Respuesta JSON IMP

});
```

En login.js, index.js, ... añadimos `{user:req.session.user, cookieAccepted:req.session.cookieAccepted});`

- Si el usuario está logeado, guarde en su perfil (en la base de datos) información de que ha aceptado las cookies.
En user.model.js: 
```javascript
users.saveCookie = function(username){
    if(users.data.hasOwnProperty(username)){
        users.data[username].cookieAccepted = true;
        console.log(`Cookie guardada en el usuario ${username}`);
    }
}
```

En app.js añadimos:
```javascript
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

4. Cuando un usuario hace login en nuestra página, si en la sesión actual ya ha aceptado cookies o en su perfil hemos guardado previamente información de que ha aceptado las cookies, no debería mostrarse el mensaje. En caso contrario sí que debería aparecer.

- Sesión actual ya ha aceptado las cookies: ya hecho `<% if (cookieAccepted) { %>`
- En la base de datos del usuario, hay info. de que se han actualizado las cookies:
```html
<script>
            const banner = document.getElementById("cookies-banner");

            // Comprobar si ha aceptado antes las cookies
            fetch('/info-cookies') //GET
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('El usuario ya había aceptado las cookies.');
                        console.log(`data: ${data.success}`)
                        banner.style.display = "none";
                    } else {
                        console.log('El usuario no ha aceptado las cookies.');
                        banner.style.display = "inline";
                    }
                })
                .catch(error => console.error('Error al verificar las cookies:', error));


            // Pulso botón "Aceptar"
            function aceptarCookies(){
                fetch('/guardar-info-cookies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Preferencia de cookies guardada:', data);
                    banner.style.display = "none";

                })
                .catch(error => {
                    console.error('Error al guardar la preferencia de cookies:', error);
                });

            }

        </script>
```

En app.js:
```javascript
app.get('/info-cookies',async (req, res) => {
  // Si ha aceptado prev las cookies --> success
  if(req.session.cookieAccepted){
    return res.json({ success: true });
  }

  // Si ha aceptado las cookies en la base de datos --> success
  if(req.session.user){
    username = req.session.user.username;
    try{
      const response = await database.user.isCookiesAccepted(username); // Resuelve la promesa
      return res.json({ success: response});
    }catch(e){
      console.error(`Error: ${error}`);
      return res.status(500).json({ success: false});
    }
  }

  res.json({ success: false });
});
```
Y en la base de datos (user.model.js):
```javascript
users.isCookiesAccepted = async function(username){
    return users.data[username].cookieAccepted ;
}
```

Finalmente, en el routes/login.js tenemos que cargar las preferencias de la base de datos:
```javascript
outer.post('/', async (req, res) => {
  const user = req.body.user;
  if(await database.user.isLoginRight(user, req.body.pass)){
    req.session.user = {username: user};
    try{
      const cookies_db = await database.user.isCookiesAccepted(req.session.user.username);
      req.session.cookieAccepted = cookies_db
    }catch(error){
      req.session.cookieAccepted = false
      console.log(`Error: ${error}`)
    }
    req.session.message = "¡Login correcto!"
    res.redirect("restricted");
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("login");
  }
});
```


## Fallos comunes con await/async

#### 1. **Error al asignar el resultado de una promesa a una variable:**
   - **Problema:**
     ```javascript
     await req.session.cookieAccepted = database.user.isCookiesAccepted(req.session.user.username);
     ```
     No es válido usar `await` en una asignación.

   - **Solución:**
     Usa `await` para resolver la promesa y luego asigna el valor:
     ```javascript
     const cookiesAccepted = await database.user.isCookiesAccepted(req.session.user.username);
     req.session.cookieAccepted = cookiesAccepted;
     ```

#### 2. **[object Promise] al imprimir resultados de funciones asincrónicas:**
   - **Problema:**
     Si imprimes directamente el resultado de una función asincrónica, como:
     ```javascript
     console.log(`El usuario ${username} --> Cookies = ${response}`);
     ```
     Obtendrás `[object Promise]` en lugar del valor esperado.

   - **Solución:**
     Asegúrate de resolver la promesa antes de usar el valor:
     ```javascript
     const response = await database.user.isCookiesAccepted(username);
     console.log(`El usuario ${username} --> Cookies = ${response}`);
     ```

