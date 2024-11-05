const https = require('https');
const fs = require('fs');

let previousPrice = null;

// Vuelos Madrid-Roma del 13 dic - 18 dic
const url = 'https://www.kayak.es/flights/MAD-ROM/2024-12-13/2024-12-18';


function scrapePage() {
  https.get(url, (res) => {
    let data = '';

    // Recibir los datos de la página
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Procesar datos (end --> FIN html)
    res.on('end', () => {
      const price = extractPrice(data);
      
      // Comparar con precio anterior
      if (previousPrice !== null) {
        console.log(`Precio anterior: ${previousPrice}, Precio actual: ${price}`);
        if (price < previousPrice) {
          console.log('El precio ha bajado');
        } else if (price > previousPrice) {
          console.log('El precio ha subido');
        } else {
          console.log('El precio no ha cambiado');
        }
      }

      previousPrice = price;

      // Guardar en un archivo de registro
      logPrice(price);
    });
  }).on('error', (err) => {
    console.error(`Error al hacer scraping: ${err.message}`);
  });
}

// Extraer el precio desde el HTML
function extractPrice(html) {
  // Buscar el <div> con la clase "f8F1-price-text"
  const regex = /<div class="f8F1-price-text">([\d,]+)&nbsp;€<\/div>/;
  const match = html.match(regex);

  if (match && match[1]) {
    // Convertir el precio en un número flotante (sin comas)
    return parseFloat(match[1].replace(',', ''));
  } else {
    console.log('No se encontró el precio en la página');
    return null;
  }
}

function logPrice(price) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp}: ${price}€\n`;
  fs.appendFile('logPrecios.txt', logEntry, (err) => {
    if (err) throw err;
    console.log(`Precio registrado: ${price}€`);
  });
}

scrapePage(); 
setInterval(scrapePage, 10 * 60 * 1000);  // Repetir cada 10 minutos

// Servidor básico
const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`Último precio registrado: ${previousPrice}€`);
});


server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
