const http = require('http');
const os = require('os');
const fs = require('fs');

// Leer el archivo de configuración
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const intervaloSeg = config.intervalo * 1000; // Convertir segundos a milisegundos

// Info del sistema
function logSystemInfo() {
    const usoCPU = os.loadavg();
    const usoMem = process.memoryUsage();
    const sistActivo = os.uptime();
    const ejecNode = process.uptime();

    console.log(`
        Uso de CPU: ${usoCPU.join(', ')}
        Uso de memoria: RSS: ${usoMem.rss / 1024 / 1024} MB, Heap: ${usoMem.heapUsed / 1024 / 1024} MB
        Tiempo que el sistema lleva activo: ${Math.floor(sistActivo / 60)} minutos
        Tiempo que lleva ejecutándose node.js: ${Math.floor(ejecNode / 60)} minutos
    `);
}

// info al iniciar
console.log(`Versión de Node.js: ${process.version}`);
logSystemInfo();


const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader( 'Content-Type', 'text/plain');
    res.end('<h1> Servidor Básico Node </h1>');
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Mostrar información de manera periódica
setInterval(logSystemInfo, intervaloSeg);
