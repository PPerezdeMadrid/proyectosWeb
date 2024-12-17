const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.user, CookiesAceptadas: req.session.CookiesAceptadas});
});

router.post('/', async (req, res) => {
  const user = req.body.user;
  if(await database.user.isLoginRight(user, req.body.pass)){
    req.session.user = {username: user};
    req.session.message = "¡Login correcto!"
    try{
       if(req.session.CookiesAceptadas){
        const response = await database.user.saveCookie(username);
       }else{
       const cookies_db = await database.user.hasAcceptedCookies(user);
       // Alternativa: database.user.data[user].CookiesAceptadas
       req.session.CookiesAceptadas = cookies_db;
       console.log(`Cookies de ${user} obtenidas de la base de datos: ${cookies_db}`);
       }
    }catch(error){
      console.error(error)
    }
    console.log(database.user.data[user].CookiesAceptadas);
    res.redirect("restricted");
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("login");
  }
});

module.exports = router;
