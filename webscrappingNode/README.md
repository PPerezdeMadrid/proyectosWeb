# Proyecto de Scraping y Servidor Web

Este proyecto consiste en un conjunto de scripts de Node.js que realizan scraping de información de dos fuentes: el Centro Criptológico Nacional (CCN). Además cuenta con un programa para leer todo el código de una página. 

## Archivos del Proyecto

### 1. `servidorCNI.js`

Este archivo es un servidor web que realiza scraping de la página de noticias del CCN para extraer títulos de noticias. Los datos se guardan y se muestran en un formato de lista en la página web.

#### Funcionalidades:
- Realiza scraping cada 10 minutos.
- Extrae y guarda los títulos y enlaces de las noticias.
- Muestra los datos extraídos en un servidor web.

#### Cómo Ejecutar:
1. Asegúrate de tener Node.js instalado.
2. Ejecuta el siguiente comando en la terminal:
   ```bash
   node servidorCNI.js
   ```
3. Abre tu navegador y visita `http://localhost:3000` para ver los datos extraídos.

---

### 2. `obtenerHTML.js`

Este archivo es un script que hace scraping de la página del CCN y muestra el contenido específico extraído en la consola.

#### Funcionalidades:
- Extrae títulos de noticias y enlaces desde la página.
- Imprime el contenido extraído en la consola.

#### Cómo Ejecutar:
1. Asegúrate de tener Node.js instalado.
2. Ejecuta el siguiente comando en la terminal:
   ```bash
   node obtenerHTML.js
   ```

---

### 3. `servidorKayak.js`

Este archivo es un servidor web que realiza scraping de la página de Kayak para obtener precios de vuelos entre Madrid y Roma. Además, registra los precios en un archivo y muestra el último precio en el servidor web. Sin embargo, debido a las restricciones de la web este archivo no funciona. 

El archivo robots.txt indica qué partes de un sitio web pueden ser rastreadas por los motores de búsqueda y qué partes están restringidas. En el caso de Kayak, hay varias secciones del sitio que están deshabilitadas para todos los agentes de usuario (entre ellas /flights/).

#### Funcionalidades:
- Realiza scraping cada 10 minutos.
- Extrae el precio del vuelo y lo compara con el precio anterior.
- Guarda los precios en un archivo `logPrecios.txt`.
- Muestra el último precio registrado en un servidor web.

#### Cómo Ejecutar:
1. Asegúrate de tener Node.js instalado.
2. Ejecuta el siguiente comando en la terminal:
   ```bash
   node servidorKayak.js
   ```
3. Abre tu navegador y visita `http://localhost:3000` para ver el último precio registrado.

---

## Requisitos

- Node.js instalado en tu máquina.
- Acceso a internet para realizar las solicitudes HTTP.
