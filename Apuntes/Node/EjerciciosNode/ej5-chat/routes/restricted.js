var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('restricted', { user:req.session.user , CookiesAceptadas: req.session.CookiesAceptadas});
});

module.exports = router;
