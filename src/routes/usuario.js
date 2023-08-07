const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-c');
const { verificarSesion, verifyToken } = require('../middlewares/auth');


// Ruta para mostrar el formulario de registro de usuarios

router.get('/crear', verificarSesion, (req, res) => {
  setTimeout(() => {
    // Si el usuario está autenticado, redirigir al usuario a la página de inicio
    if (req.user) {
      res.redirect('/index');
    } else {
      // Si el usuario no está autenticado, mostrar la página de inicio de sesión
      res.render('register.ejs');
    }
  }, 800);
});

// Ruta para crear un usuario (POST)
router.post('/crear', (req, res) => {
  setTimeout(() => {
    controller.crearUsuario(req, res);
  }, 800);
});



// Ruta para iniciar sesión (POST)
router.post('/login', (req, res) => {
  setTimeout(() => {
    controller.iniciarSesion(req, res);
  }, 800);
});



router.get('/login', verificarSesion, (req, res) => {
  setTimeout(() => {
    // Si el usuario está autenticado, redirigir al usuario a la página de inicio
    if (req.user) {
      res.redirect('/index');
    } else {
      // Si el usuario no está autenticado, mostrar la página de inicio de sesión
      res.render('login.ejs');
    }
  }, 800);
});


router.use((req ,res) => {
  res.status(404).render('404', {mensaje: 'Página no encontrada'})
})

module.exports = router;