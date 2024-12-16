const express = require('express');
const router = express.Router();
const database = require('../database');
const cookieParser = require('cookie-parser');

router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.user, cookieAccepted:req.session.cookieAccepted});
});

router.post('/', async (req, res) => {
  const user = req.body.user;
  if(await database.user.isLoginRight(user, req.body.pass)){
    req.session.user = {username: user};
    try{
      const cookies_db = await database.user.isCookiesAccepted(req.session.user.username);
      console.log(`En el login, las cookies: ${cookies_db}`)
      req.session.cookieAccepted = cookies_db
    }catch(error){
      req.session.cookieAccepted = false
    }
    req.session.message = "¡Login correcto!"
    res.redirect("restricted");
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("login");
  }
});

module.exports = router;
