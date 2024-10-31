const http = require('http');
const fs = require('fs');
const url = require('url');

const cargarDiccionario = () => {
    return new Promise((resolve, reject) => { //Asíncrona (promise)
        fs.readFile('diccionario.txt', 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            const palabras = data.split('\n').filter(Boolean); // líneas vacías
            resolve(palabras);
        });
    });
};


const generarContrasena = (palabras, numPalabras) => {
    let contrasena = [];
    for (let i = 0; i < numPalabras; i++) {
        const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
        contrasena.push(palabraAleatoria);
    }
    return contrasena.join(''); 
};

// Crear el servidor
const server = http.createServer(async (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const numPalabras = parseInt(queryObject.x, 10);

    if (isNaN(numPalabras) || numPalabras <= 0) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' }); // Establecido a 'utf-8'
        res.end(`
            <p class="error">Parámetro inválido. Debes proporcionar un número positivo en la consulta (x).</p>
            <p> <strong> http://localhost:3000?x=10 </strong> </p>
        `);
        return;
    }
    
    try {
        const palabras = await cargarDiccionario();
        const contrasena = generarContrasena(palabras, numPalabras);
    
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // Establecido a 'utf-8'
        res.end(`
                <h1>Contraseña generada:</h1>
                <p>${contrasena}</p>
        `);
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' }); // Establecido a 'utf-8'
        res.end(`
                <p class="error">Error al cargar el diccionario.</p>
        `);
        console.error(error);
    }
    
    
});


server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

