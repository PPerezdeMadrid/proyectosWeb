const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('restricted', {user: req.session.user, CookiesAceptadas: req.session.CookiesAceptadas});
});

module.exports = router;
