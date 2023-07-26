const express = require('express');
const router = express.Router();
const controller = require('../controllers/respuestas-c')


// Ruta para obtener todas las respuestas (GET)
router.get('/', controller.obtenerRespuesta);

// Ruta para obtener una respuesta por su id de encuesta (GET)
router.get('/id_encuesta/:id_encuesta', controller.obtenerRepuestaPorId);

// Ruta para actualizar una respuesta por su id (PUT)
router.put('/id/:id', controller.actualizarRespuestaPorId);

// Ruta para eliminar una respuesta por su id (DELETE)
router.delete('/id/:id', controller.eliminarRespuestaPorId);

// Ruta para crear una respuesta (POST)
router.post('/crear', controller.crearRespuesta);

// Ruta para mostrar el formulario de crear respuestas (GET)
router.get('/crear', (req, res) => {
    // Renderizar el archivo EJS
    res.render('respuestas-crear.ejs')
  });

module.exports = router;