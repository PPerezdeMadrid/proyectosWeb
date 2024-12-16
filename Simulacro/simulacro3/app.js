const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const tiendaRouter = require('./routes/tienda');
const restrictedRouter = require('./routes/restricted');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Una frase muy secreta",
  resave: false,
  saveUninitialized: true
}));
app.use((req,res,next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if(message) res.locals.message = `<p>${message}</p>`;
  if(error) res.locals.error = `<p>${error}</p>`;
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/tienda', tiendaRouter);
app.use('/restricted', restricted, restrictedRouter);
app.use('/logout', (req,res) =>{
  req.session.destroy();
  res.redirect("/");
});

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("login");
  }
}

const database = require('./database');

app.post('/guardar-info-cookies', (req, res) => {
  req.session.cookieAccepted = true;
  console.log("El usuario ha aceptado las cookies");
  console.log(req.session.user);
  if(req.session.user){
    // Guardar en su perfil que ha aceptado las cookies
    username = req.session.user.username;
    console.log(`Nombre de Usuario: ${username}`);
    database.user.saveCookie(username);
  }
  res.json({ success: true }); // Respuesta JSON IMP

});

app.get('/info-cookies',async (req, res) => {
  // Si ha aceptado prev las cookies --> success
  if(req.session.cookieAccepted){
    return res.json({ success: true });
  }

  // Si ha aceptado las cookies en la base de datos --> success
  if(req.session.user){
    username = req.session.user.username;
    try{
      const response = await database.user.isCookiesAccepted(username); // Resuelve la promesa
      console.log(`El usuario ${username} --> Cookies = ${response}`);
      return res.json({ success: response});
    }catch(e){
      console.error(`Error: ${error}`);
      return res.status(500).json({ success: false});
    }
  }

  res.json({ success: false });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const TITLE = process.env.TITLE || "Embutidos León" // Opcional, para pasarlo por la terminal
app.locals.TITLE = TITLE; 

module.exports = app;
