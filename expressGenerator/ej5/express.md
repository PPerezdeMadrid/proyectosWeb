```bash
npm init -y
```

```bash
npm install express ejs
```

Para usar el `npm start` hay que modificar el archivo `package.json`:
En la sección de scripts:
```json
"scripts": {
  "start": "node ./bin/www"
}
```

Copiamos las siguientes carpetas:
- app.js
- views
- Routes
- bin

Instalamos dependencias:
```bash
npm install cookie-parser morgan express-session
```