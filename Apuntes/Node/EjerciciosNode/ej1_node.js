const http = require('http');
const os = require('os');
const fs = require('fs');
const osUtils = require('os-utils');


// Leer configuración
let config = JSON.parse(fs.readFileSync('config_ej1.json', 'utf8'));

// Función para mostrar las métricas
function imprimirMetricas() {
    const uptime = os.uptime();
    const nodeUptime = process.uptime();
  
    // Mostrar las métricas configuradas
    if (config.metrics.includes("cpu")) {
      osUtils.cpuUsage(cpuUsage => {
        console.log(`Uso de CPU: ${(cpuUsage * 100).toFixed(2)}%`);
      });
    }
  
    if (config.metrics.includes("memory")) {
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;
      console.log(`Uso de Memoria: ${(usedMem / totalMem * 100).toFixed(2)}%`);
    }
  
    if (config.metrics.includes("uptime")) {
      console.log(`Tiempo de actividad del sistema: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`);
    }
  
    if (config.metrics.includes("node_uptime")) {
      console.log(`Tiempo de ejecución de Node.js: ${Math.floor(nodeUptime / 3600)}h ${Math.floor((nodeUptime % 3600) / 60)}m ${Math.floor(nodeUptime % 60)}s`);
    }
  
    console.log('--------------------------------------');
  }

function imprimirInfoSyst() {
    console.log('Información del sistema:');
    console.log(`Versión de Node.js: ${process.version}`);
    console.log(`Sistema operativo: ${os.type()} ${os.release()}`);
    console.log(`Arquitectura: ${os.arch()}`);
    console.log(`Total de memoria: ${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`);
    console.log(`Memoria libre: ${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`);
    console.log('--------------------------------------');
  }


// Iniciar el servidor
const server = require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor en ejecución\n');
  });
  
  // Mostrar la información inicial
  imprimirInfoSyst();
  
  // Configurar el intervalo para mostrar métricas
  setInterval(() => {
    imprimirMetricas();
  }, config.interval * 1000);
  
  // Iniciar el servidor en el puerto 3000
  server.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
  });