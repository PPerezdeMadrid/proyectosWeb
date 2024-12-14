const express = require('express');
const router = express.Router();
const config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tienda', {user:req.session.user, title:config.nombreTienda, cookie: req.session.AcceptCookie});
});

module.exports = router;
