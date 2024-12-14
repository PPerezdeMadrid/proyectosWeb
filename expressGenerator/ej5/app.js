var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var restrictedRouter = require('./routes/restricted');
var chatRouter = require('./routes/chat');


var app = express();

// Configurar las sesiones
app.use(session({
  secret: 'CLAVE',  // Usa una clave secreta para cifrar la sesión
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/restricted', checkAuthenticated, restrictedRouter);
app.use('/chat', checkAuthenticated, chatRouter);

// Middleware para verificar si el usuario está logueado
function checkAuthenticated(req, res, next) {
  console.log(req.session); // Imprimir cookies de la sesión
  if (!req.session.username) {  // Verifica si el usuario está logueado
    return res.redirect('/login'); 
  }
  next();  // Si está logueado, ejecuta el siguiente callback
}

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Ha habido un error: ", err) 
    }
    console.log("El usuario ha cerrado la sesión")
    res.redirect('/'); 
  });
});



module.exports = checkAuthenticated;



module.exports = app;
