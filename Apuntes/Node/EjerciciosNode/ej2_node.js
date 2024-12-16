const http = require('http');
const fs = require(`fs`);

// Leer configuración
let diccionario = fs.readFileSync('diccionario.txt', 'utf8');

function generarContrasena(numPalabras){    
    const palabras = diccionario.split('\n').filter(word => word.trim() !== '');
    let contrasena = [];
    for(let i=0; i<numPalabras; i++){
        // Obtener un índice aleatorio dentro del rango de las palabras
        const randomIndex = Math.floor(Math.random() * palabras.length);
        palabraIndex = palabras[randomIndex]
        contrasena.push(palabraIndex);
    }
    return contrasena.join("")
}

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    // Obtener el número de palabras desde la URL (query string)
    let url = new URL(req.url, `http://${req.headers.host}`);
    let x = parseInt(url.searchParams.get('x')) || 3; // Por defecto, 3 palabras
  
    // Generar la contraseña
    let password = generarContrasena(x);
  
    // Configurar la respuesta
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>Contraseña: ${password}</h1>`);
  });

  const port = 3000;
  server.listen(port, () => {
    console.log(`Servidor corriendo en  http://localhost:${port}`);
  });