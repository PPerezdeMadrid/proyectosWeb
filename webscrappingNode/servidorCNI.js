const https = require('https');
const http = require('http');

const url = 'https://www.ccn-cert.cni.es/es/seguridad-al-dia/actualidad-ccn.html';

// Guardar datos extraídos
let dataHistory = [];

function scrapePage() {
  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;  
    });

    res.on('end', () => {
      console.log('Tamaño de los datos recibidos:', data.length);

      // Encontrar todos los <td class="list-title">
      const regex = /<td class="list-title"[^>]*>(.*?)<\/td>/gs;
      const matches = data.match(regex);
      const extractedData = []; 

      if (matches) {
        matches.forEach((match) => {
          // Enlaces
          const linkRegex = /<a href="([^"]*)">(.*?)<\/a>/s;
          const linkMatch = match.match(linkRegex);

          if (linkMatch && linkMatch[1] && linkMatch[2]) {
            extractedData.push({
              // Guardar el título y el enlace
              title: linkMatch[2].trim(),
              href: linkMatch[1].trim(),
            });
          }
        });

        // Guardar la evolución de los datos
        dataHistory.push(extractedData);
      } else {
        console.log('No se encontraron <td> con la clase "list-title".');
      }
    });
  }).on('error', (err) => {
    console.error(`Error al hacer scraping: ${err.message}`);
  });
}

// Crear el servidor
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  
  let html = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Datos Extraídos</title></head><body>';
  html += '<h1>Noticias CNI</h1>';
  html += '<ul>';

  dataHistory.forEach((entry) => {
    entry.forEach((item) => {
      html += `<li><a href="https://www.ccn-cert.cni.es${item.href}" target="_blank">${item.title}</a></li>`;
    });
    html += '<hr>';
  });

  html += '</ul></body></html>';

  res.end(html);
});

scrapePage(); 
setInterval(scrapePage, 10 * 60 * 1000); // Repetir cada 10 minutos


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


