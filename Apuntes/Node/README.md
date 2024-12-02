# Apuntes de Node (T6)

Node.js es un entorno de ejecución de JavaScript del lado del servidor. Permite ejecutar código JavaScript fuera del navegador, utilizando el motor V8 de Google Chrome. Es ideal para construir aplicaciones rápidas y escalables, especialmente para servicios web en tiempo real, gracias a su arquitectura basada en eventos y no bloqueante.

- Open-source
- Cross-platform
- JavaScript Run Enviroment

## Introducción
### Node Version Manager (nvm)
```bash
nvm list # Listar versiones instaladas
nvm use x.y.z
nvm install x.y.z
nvm --help
```

### Node Package Manager (npm)
- Gestor de paquetes, instalado junto a Node.js
- Gestiona las dependencias del proyecto
- Permite definir y ejecutar tareas

```bash
npm init # Crear el archivo de config (package.json)
npm install | npm i # Instalación dependecias de package.json
npm install <nombre_paquete> [@version]
npm list | npm ls # Listar los paquetes instalados
npm update [<nombre_paquete>]
npm uninstall <nombre_paquete>
npm view <nombre_paquete> [versions]
```

### REPL y npx
- REPL: Read Evaluate Print Loop 
    + Entorno de node.js en forma de consola
    + Para ejecutar: `node`
    + Comandos especiales: `.help`, `exit` (o ctrl+c x2)
- npx: herramienta que viene con Node instalada
    + Permite ejec. código
    + Por ejemplo:
    ```bash
    npx cowsay hello
    ```

### Ejemplo de Servidor
```javascript
// Importar librerías
const http = require("http");

const port = 3000;

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end('<h1> Hello World! </h1>');
});
// req --> obj http.IncomingMessage [info petición]
// res --> obj http.ServerResponse [info respuesta]

server.listen(port, () =>{
    console.log(`Server listening at port ${port}`);
});
// server.listen(port, [, host[,backlog]], callback)
```

Módulos Core de Node:
- url --> Trabajar y parsear URLs
- path --> Trabajar y parsear paths 
- fs --> Trabajar con I/O en archivos
- utils --> funcionalidades !=

### Variables de entorno
Accesible con el módulo `process`
```javascript
const PORT = process.env.PORT || 3000
```
```bash
PORT=3500 node index.js
```
- `NODE_ENV` = production o development
- Se pueden cargar de un archivo .env con el módulo `dotenv`
```bash
npm install dotenv
```
```text
# .env file

USER_ID="455212S"
PORT=3001
```
Para acceder desde Node:
```javascript
require('dotenv').config()
process.env.USER_ID; //455212S
```

### Argumentos 
```bash
node index.js palo perez
```
```javascript
// index.js
const args = process.argv.slice(2); // Ignora los dos primeros elementos
console.log(args); // ['palo', 'perez']
``` 
- También puedes hacerlo de la siguiente forma (pero hay que parsearlo en index.js):
```bash
node index.js name=palo surname=perez
```
- Otra alternativa es usar el módulo `minimist`
```bash
npm install minimist
node index.js --name=paloma --surname=perez
node index.js -name paloma -surname perez
```
```javascript
// index.js
// index.js
const minimist = require('minimist');

// Parsear argumentos
const args = minimist(process.argv.slice(2));

// Acceder a los argumentos
console.log(`Name: ${args.name}`);
console.log(`Surname: ${args.surname}`);
```

### Módulo Process
Objeto global con info. general de la ejecución de Node.
```javascript
const args = process.argv; // Argumentos de la línea de comandos
const arch = process.arch; // Arquitectura de la CPU
const cwd = process.cwd(); // Directorio de trabajo actual
const cpuUsage = process.cpuUsage(); // Uso de CPU por el proceso
const env = process.env; // Variables de entorno
const execPath = process.execPath; // Ruta del ejecutable de Node.js
process.exit(0); // Finalizar el proceso con un código de salida
process.exitCode = 1; // Establecer el código de salida
process.kill(pid, signal); // Enviar señal a otro proceso
const memoryUsage = process.memoryUsage(); // Uso de memoria del proceso
process.nextTick(() => {}); // Ejecutar una función en la próxima iteración
const pid = process.pid; // ID del proceso actual
const platform = process.platform; // Plataforma del sistema operativo
const resourceUsage = process.resourceUsage(); // Uso de recursos del proceso
const uptime = process.uptime(); // Tiempo de ejecución del proceso
const version = process.version; // Versión de Node.js
const versions = process.versions; // Información de versiones de dependencias
```

### Módulo OS
Módulo con acceso al S.O.
```javascript
const os = require('os');

const cpus = os.cpus(); // Información sobre los núcleos de la CPU
const freemem = os.freemem(); // Memoria libre disponible
const homedir = os.homedir(); // Directorio home del usuario
const hostname = os.hostname(); // Nombre del host de la máquina
const loadavg = os.loadavg(); // Carga promedio del sistema en 1, 5 y 15 minutos
const networkInterfaces = os.networkInterfaces(); // Interfaces de red y sus direcciones
const release = os.release(); // Versión del sistema operativo
const totalmem = os.totalmem(); // Memoria total del sistema
const uptime = os.uptime(); // Tiempo de actividad del sistema en segundos
```
---

## JSON

### 1. **Sintaxis básica**
- JSON (JavaScript Object Notation) es un formato de texto ligero para almacenar y transportar datos.
- **Estructura básica**: Se compone de *pares clave-valor* y puede incluir objetos y arrays.

**Ejemplo**:
```json
{
  "nombre": "Paloma",
  "edad": 25,
  "esEstudiante": true
}
```

### 2. **Tipos de datos**
- **Objetos**: Representados por llaves `{}` y contienen pares clave-valor.
- **Arrays**: Representados por corchetes `[]` y pueden contener valores de cualquier tipo (números, cadenas, objetos, otros arrays, etc.).
- **Valores permitidos**:
  - Cadenas de texto (`"texto"`)
  - Números (sin comillas)
  - `true`, `false`, `null`
  - Objetos `{}` y arrays `[]`

**Ejemplo**:
```json
{
  "nombre": "Paloma",
  "hobbies": ["lectura", "ciclismo", "programación"],
  "datosPersonales": {
    "edad": 25,
    "ciudad": "Madrid"
  }
}
```

### 3. **Espacios en blanco**
- Se pueden usar para hacer el JSON más legible.
- Los espacios en blanco, saltos de línea y tabulaciones son ignorados por los parsers de JSON.

**Ejemplo**:
```json
{
  "clave": "valor"
}
```
es lo mismo que:
```json
{
  "clave": "valor"
}
```

### 4. **Comas finales (trailing commas)**
- **No permitidas** en JSON. Una coma al final de un objeto o array genera un error de sintaxis.

**Incorrecto**:
```json
{
  "nombre": "Paloma",
  "edad": 25,
}
```

**Correcto**:
```json
{
  "nombre": "Paloma",
  "edad": 25
}
```

### 5. **Orden en arrays y objetos**
- **Arrays**: El orden de los elementos se mantiene.
- **Objetos**: El orden de las claves no está garantizado y puede variar entre diferentes implementaciones de JSON. Sin embargo, en la mayoría de los casos modernos, el orden de las claves es preservado en objetos.

**Ejemplo de array**:
```json
[1, 2, 3, 4] // El orden es importante
```

**Ejemplo de objeto**:
```json
{
  "clave1": "valor1",
  "clave2": "valor2"
} 
// El orden de "clave1" y "clave2" puede cambiar al parsear
```

### 6. **Cadenas de texto**
- Deben estar entre comillas dobles `"` (no se permite el uso de comillas simples `'`).
- Las comillas dobles dentro de la cadena deben escaparse con `\`.

**Ejemplo**:
```json
{
  "mensaje": "Hola, \"Paloma\""
}
```

### 7. **Uso de caracteres de escape**
- Se pueden usar para incluir caracteres especiales:
  - `\"` para comillas dobles
  - `\\` para barra invertida
  - `\n` para salto de línea
  - `\t` para tabulación

**Ejemplo**:
```json
{
  "texto": "Línea 1\nLínea 2"
}
```

### 8. **Limitaciones y buenas prácticas**
- Las claves de los objetos deben ser siempre cadenas entre comillas dobles.
- No se permite el uso de funciones o expresiones como valores.
- JSON es un formato de solo texto, no puede incluir métodos ni propiedades de objetos JavaScript.

**Ejemplo de un JSON válido**:
```json
{
  "nombre": "Juan",
  "activo": true,
  "detalles": {
    "edad": 30,
    "profesion": "ingeniero"
  }
}
```

**Ejemplo de un JSON no válido**:
```json
{
  nombre: "Juan", // Claves sin comillas no válidas
  "activo": undefined // undefined no es un valor permitido
}
```

### JSON con **JavaScript**
- Usa `JSON.parse()` para convertir una cadena JSON en un objeto de JavaScript.

**JSON --> Text**: stringigy
```javascript
const obj = { nombre: "Paloma", edad: 25 };
const jsonString = JSON.stringify(obj);
console.log(jsonString); // '{"nombre":"Paloma","edad":25}'
```
**Text --> JSON**: parse

```javascript
const jsonString = '{"nombre": "Paloma", "edad": 25}';
const obj = JSON.parse(jsonString);
console.log(obj.nombre); // "Paloma"
```

### Estructura de un `package.json`

Contiene metadatos sobre el proyecto, dependecias, descripción, versión, licencia, configuración.

**Estructura básica de `package.json`**:
```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Descripción de mi proyecto",
  "main": "index.js", // Archivo principal de entrada
  "scripts": {
    "start": "node index.js", // Comando para iniciar el proyecto
    "test": "echo \"Error: no test specified\" && exit 1" // Comando de prueba por defecto
  },
  "keywords": ["prueba", "test"], // Array de palabras clave. Útil para buscar el paquete en npm
  "author": "Paloma", // 1 solo autor, N colaboradores
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1" // Dependencias del proyecto (^ =  permite q se instale la última versión compatible )
  },
  "devDependencies": {
    "nodemon": "^2.0.7" // Dependencias de desarrollo
  }
}
```
Se ejecuta con `node .`

```javascript
// Puedes leer `package.json` en un script de Node.js usando el módulo `fs`:
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

console.log(`Nombre del proyecto: ${packageJson.name}`);
console.log(`Versión: ${packageJson.version}`);
console.log(`Dependencias:`, packageJson.dependencies);
```

#### Package-lock.json
`package-lock.json` es un archivo que se genera automáticamente cuando instalas dependencias con `npm`. Su propósito es garantizar que todas las personas que trabajen en el proyecto tengan las mismas versiones de las dependencias instaladas, evitando problemas de compatibilidad. Contiene detalles como las versiones exactas de los paquetes y sus subdependencias, y verifica la integridad de los paquetes instalados.

**Ventajas**:
- Bloquea versiones para consistencia entre entornos.
- Mejora la velocidad de instalación al evitar resolver versiones desde cero.

**Diferencia con `package.json`**:
- `package.json` describe las dependencias deseadas, mientras que `package-lock.json` garantiza que esas versiones se instalen de forma idéntica en todos los entornos.

Debe incluirse en el control de versiones para proyectos de desarrollo, pero generalmente no se incluye en bibliotecas que otros consumirán.
---

## Event Loop
Mecanismo que permite festionar la ejecución de operaciones asíncronas de manera eficiente en un único hilo. 
- 1 solo Thread
- Ciclo que se repite (loop) [cada vuelta se llama `tick`]: se ejecuta constantemente mientras haya tareas pendientes
- Cola de Callbacks: las op. asíncronas (lectura archivo, HTTP Request, ...) pasan sus callbacks a la cola FIFO
- Gestionado por la librería libuv

```javascript
console.log('Inicio');

setTimeout(() => {
  console.log('Operación asíncrona completada'); // Se va a la FIFO
}, 2000);

console.log('Fin');

/* Imprime:
Inicio
Fin
Operación asíncrona completada
*/
```

Es **importante** no bloquear el Event Loop con tareas que tarden mucho en ejecutarse:
- Cada `tick` debe ser corto
- El trabajo asociado a cada Cliente debe ser breve
- Intentar dividir las tareas más intensivas

## Ficheros

## Peticiones HTTP

## Ex