const https = require('https');

// URL de la página que queremos scrapear
const url = 'https://www.ccn-cert.cni.es/es/seguridad-al-dia/actualidad-ccn.html';

// Función para hacer scraping de la página y extraer el contenido específico
function scrapePage() {
  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;  
    });

    res.on('end', () => {
      console.log('Tamaño de los datos recibidos:', data.length);

      // Usar una expresión regular para encontrar todos los <td class="list-title">
      const regex = /<td class="list-title"[^>]*>(.*?)<\/td>/gs;
      const matches = data.match(regex);

      if (matches) {
        // Iterar sobre cada coincidencia para extraer el contenido del enlace
        matches.forEach((match) => {
          // Extraer el texto del enlace dentro del <td>
          const linkRegex = /<a href="[^"]*">(.*?)<\/a>/s;
          const linkMatch = match.match(linkRegex);

          if (linkMatch && linkMatch[1]) {
            console.log(`Contenido extraído: ${linkMatch[1].trim()}`);
          }
        });
      } else {
        console.log('No se encontraron <td> con la clase "list-title".');
      }
    });
  }).on('error', (err) => {
    console.error(`Error al hacer scraping: ${err.message}`);
  });
}

scrapePage();

