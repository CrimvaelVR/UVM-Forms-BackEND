const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-c');
const { verificarSesion, verifyToken } = require('../middlewares/auth');
const { checkRole } = require("../middlewares/auth")

// Ruta para obtener todos los usuarios (GET)
router.get('/', 
function(req, res, next){
  var roles = ["admin"];
  checkRole(req, res, next, roles)
}, 
controller.obtenerUsuarios);

// Ruta para obtener un usuario por su id (GET)
router.get('/id/:id', 
function(req, res, next){
  var roles = ["admin"];
  checkRole(req, res, next, roles)
}, 
controller.obtenerUsuarioPorId);

// Ruta para actualizar un usuario por su id (PUT)
router.put('/id/:id', 
function(req, res, next){
  var roles = ["admin"];
  checkRole(req, res, next, roles)
}, 
controller.actualizarUsuarioPorId);

// Ruta para eliminar un usuario por su id (DELETE)
router.delete('/id/:id', 
function(req, res, next){
  var roles = ["admin"];
  checkRole(req, res, next, roles)
}, controller.eliminarUsuarioPorId);


// Ruta para mostrar el formulario de registro de usuarios

router.get('/crear', (req, res) => {
  setTimeout(() => {
    res.render('register.ejs')
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



module.exports = router;