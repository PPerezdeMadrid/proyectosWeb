var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express',  username: req.session.username  });
});

router.post('/', (req, res) => {
  const { username } = req.body;
  console.log('Sesión guardada:', req.session); 
  // Aquí se puede agregar la lógica para verificar el nombre de usuario 
  if (username === 'admin' || username === 'paloma' || username === 'usuario') {
    // Si las credenciales son correctas, guarda el username en la sesión
    req.session.username = username;
    res.redirect('/restricted');  // Redirige a la página restringida
  } else {
    res.redirect('/');
  }
});

module.exports = router;
