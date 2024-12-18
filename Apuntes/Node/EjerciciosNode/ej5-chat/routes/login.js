const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.user, CookiesAceptadas: req.session.CookiesAceptadas});
});

router.post('/', async (req, res) => {
  const {username, password} = req.body;
  if(await database.user.isLoginRight(username, password)){
    req.session.user = {username: username};
    req.session.message = "¡Login correcto!"
    try{
       if(req.session.CookiesAceptadas){
        const response = await database.user.saveCookie(username);
       }else{
       const cookies_db = database.user.data[username].CookiesAceptadas
       req.session.CookiesAceptadas = cookies_db;
       console.log(`Cookies de ${user} obtenidas de la base de datos: ${cookies_db}`);
       }
    }catch(error){
      console.error(error)
    }
    console.log(database.user.data[username].CookiesAceptadas);
    res.redirect("/restricted");
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("/login");
  }
});

module.exports = router;
