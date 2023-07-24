const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-c')


// Ruta para obtener todos los usuarios (GET)
router.get('/', controller.obtenerUsuarios);

// Ruta para obtener un usuario por su id (GET)
router.get('/id/:id', controller.obtenerUsuarioPorId);

// Ruta para actualizar un usuario por su id (PUT)
router.put('/id/:id', controller.actualizarUsuarioPorId);

// Ruta para eliminar un usuario por su id (DELETE)
router.delete('/id/:id', controller.eliminarUsuarioPorId);

// Ruta para crear un usuario (POST)
router.post('/crear', controller.crearUsuario);

// Ruta para mostrar el formulario de crear usuario (GET)
router.get('/crear', (req, res) => {
    // Renderizar el archivo EJS
    res.render('usuario-crear.ejs')
  });

module.exports = router;