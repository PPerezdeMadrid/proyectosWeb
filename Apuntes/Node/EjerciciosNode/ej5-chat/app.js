var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var restrictedRouter= require('./routes/restricted');
var chatRouter= require('./routes/chat');

var app = express();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Si estás trabajando en un entorno de desarrollo, asegúrate de que `secure: false`
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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

app.get('/logout', (req, res) => {
  console.log("Entra en logout");
  req.session.destroy((err) => {
    if (err) {
      console.log("Ha habido un error: ", err);
    } else {
      console.log("Sesión destruida correctamente");
    }
    res.redirect('/'); // Redirige a la página principal
  });
});
/* Nota: imp que este antes de, 404 */

const database = require('./database');

app.get('/acepta-cookies', async (req, res) => {
  req.session.req.session.CookiesAceptadas = true;
  if(req.session.user){
    try{
      const response = await database.user.saveCookie(req.session.user.username);
    }catch(error){
      console.error(error);
    }
  }
  return res.json(true); // Imp el "res"
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


function checkAuthenticated(req, res, next) {
  console.log(req.session); 
  if (!req.session.user) {  
    return res.redirect('/login'); 
  }
  next(); 
}


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.title = "Express (chat, ej5)"

module.exports = app;
