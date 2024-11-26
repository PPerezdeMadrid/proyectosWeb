var express = require('express');
var router = express.Router();

/* GET chat page. */
router.get('/', function(req, res, next) {
  // if (req.session.username) {
  res.render('chat', {  });
});

module.exports = router;
