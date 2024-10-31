# Generador de Contraseñas Aleatorias

Servidor de Node.js que genera contraseñas aleatorias utilizando palabras de un diccionario almacenado en un archivo de texto. Las contraseñas se generan basándose en un número de palabras especificado por el usuario a través de una consulta en la URL.

## Requisitos

- Node.js (versión 12 o superior)
- Un archivo de texto llamado `diccionario.txt` con una palabra por línea.

## Configuración

1. Clona este repositorio.
2. Instala Node.js (v12 o superior).
3. Ejecuta el servidor:

   ```bash
   node servidor.js 
   ```

   El parámetro "x" indica el número de palabras usadas para generar la contraseña. Por ejemplo:
   ```bash
   http://localhost:3000?x=10 
   ```
