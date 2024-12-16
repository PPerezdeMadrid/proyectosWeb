const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('restricted', {user: req.session.user, cookieAccepted:req.session.cookieAccepted});
});

module.exports = router;
