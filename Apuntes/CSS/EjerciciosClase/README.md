# Ejercicios de Clase de CSS

## Ejercicio 1
Crea una página en HTML con:
- Una cabecera
- Un menú lateral
- Un footer

## Ejercicio 2
(Inventado, el ejercicio 2 del ppt es de Bootstrap y no entra en el examen)
¡Claro! Aquí tienes un enunciado práctico de un ejercicio con **CSS Grid** que abarca conceptos esenciales:

---

### **Enunciado del ejercicio**
Diseña un **layout** de una página web utilizando **CSS Grid** con las siguientes especificaciones: 

1. El layout debe tener 3 áreas principales: **header**, **main** y **footer**.
2. El **header** debe ocupar todo el ancho de la página y tener una altura fija de 100px.
3. El área **main** debe estar dividida en dos columnas:
   - Una columna de navegación (**nav**) a la izquierda que ocupe el 25% del ancho.
   - Una columna de contenido principal (**article**) que ocupe el 75% restante.
4. El **footer** debe ocupar todo el ancho de la página, estar debajo del área **main**, y tener una altura fija de 50px.
5. Utiliza **CSS Grid** para organizar el layout.
6. Asegúrate de que los elementos estén claramente diferenciados visualmente (por ejemplo, con colores de fondo).

**Extras (opcional):**
- Haz que el layout sea **responsivo**, de manera que en pantallas más pequeñas (menos de 600px), las áreas **nav** y **article** se apilen verticalmente, una encima de la otra, ocupando el 100% del ancho.

---

### **Estructura inicial (HTML)**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid Layout</title>
</head>
<body>
  <div class="grid-container">
    <header>Header del ejercicio 2</header>
    <nav>
        <p> Inicio </p>
        <p> Proyecto </p>
        <p> Contacta con nosotros </p>
        <p> Perfil</p>
    </nav>
    <article>
        <h1> Año Nuevo, ¿La gran fiesta?</h1>
        <p> Se dice que año nuevo es una gran fiesta bla bla bla bla bla</p>
    </article>
    <footer>
        <p> Footer diseñado por PPM </p>
        <a href="https://es.linkedin.com/in/palomaperezdemadrid"> Mi linkedin </a>
    </footer>
  </div>
</body>
</html>
```

---

### **Requisitos de `styles.css`**:
1. Utiliza `display: grid` en el contenedor principal (`.grid-container`) para organizar el layout.
2. Define las áreas del grid usando `grid-template-areas`.
3. Asigna los colores y alturas correspondientes para diferenciar las secciones.

## Ejercicio 3
Creación de un banner de cookies (Ejercicio del simulacro)
**Objetivo**: Crear una barra de aceptación de cookies que se muestre en la parte inferior de la página. Esta barra debe contener un mensaje informando al usuario sobre el uso de cookies y un botón de aceptación. Debe tener un color transparente y debe superoponerse al resto de elementos. 

HTML Base: 
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aceptación de Cookies</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="content">
    <h1>Bienvenido a nuestra página web</h1>
    <p>Esta es una página de ejemplo donde aprenderás cómo usar cookies y posicionar elementos con CSS.</p>
    <img src="https://via.placeholder.com/1000" alt="columnas img">
  </div>

  <div class="cookie-banner" id="cookie-banner">
    <p>Usamos cookies para mejorar tu experiencia en nuestro sitio. <a href="#">Leer más</a></p>
    <button id="accept-btn">Aceptar</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

## Ejercicio 4
Este ejercicio se centra en el uso de z-index. 

**Objetivo**: Crear una página con tres elementos (un cuadro de texto, un botón y una imagen) que se solapen parcialmente. Utiliza el `z-index` para controlar cuál de los elementos se muestra encima de los otros cuando se superponen.

### **Requisitos**:
1. Crea tres elementos:
   - Un cuadro de texto (un div con un color de fondo).
   - Un botón con un color de fondo.
   - Una imagen que se superponga a los otros dos elementos.
   
2. Utiliza el `z-index` para asegurarte de que:
   - La imagen siempre esté encima del cuadro de texto y el botón.
   - El botón esté encima del cuadro de texto.

3. La página debe mostrar los tres elementos en una posición superpuesta utilizando propiedades como `position: absolute;` o `position: relative;`.


HTML Base:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejercicio de Z-Index</title>
  <style>

    .container {
    width: 100%;
    }

    /* Cuadro de texto */
    .box {
    background-color: lightblue;
    width: 200px;
    height: 200px;
    text-align: center;
   
    }

    /* Botón */
    .btn {
    background-color: green;
    color: white;
    }

    /* Imagen */
    .img {
        border: 1px solid black;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box" id="box1">
      <p>Cuadro de texto</p>
    </div>
    <button class="btn" id="btn1">Botón</button>
    <img src="https://via.placeholder.com/150" alt="Imagen de ejemplo" class="img" id="img1">
  </div>
</body>
</html>
```
