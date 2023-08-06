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

// Ruta para crear un usuario (POST)
router.post('/crear', controller.crearUsuario);

// Ruta para iniciar sesión (POST)
router.post('/login', controller.iniciarSesion);
router.get('/login', verificarSesion, (req, res) => {
  // Si el usuario está autenticado, redirigir al usuario a la página de inicio
  if (req.user) {
    res.redirect('/index');
  } else {
    // Si el usuario no está autenticado, mostrar la página de inicio de sesión
    res.render('login.ejs');
  }
});

// Ruta para mostrar el formulario de crear usuario (GET)

router.get('/crear',

(req, res) => {
  // Renderizar el archivo EJS
  res.render('register.ejs');
});

router.use((req ,res) => {
  res.status(404).render('404', {mensaje: 'Página no encontrada'})
})

module.exports = router;