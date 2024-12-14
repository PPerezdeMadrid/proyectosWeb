const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/', function(req, res) {
  res.render('restricted', {user: req.session.user, title:config.nombreTienda, cookie: true});
});

module.exports = router;
