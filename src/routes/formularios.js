const express = require('express');
const router = express.Router();
const controller = require('../controllers/formularios-c')
const controller2 = require('../controllers/respuestas-c')


// Ruta para crear un formulario (POST)
router.post('/crear', (req, res) => {
    // Aplicar un tiempo de espera de 2 segundos
    setTimeout(() => {
      // Invocar la función del controlador con req y res
      controller.crearFormulario(req, res);
    }, 800);
  });



router.get('/crear', (req, res) => {
    // Aplicar un tiempo de espera de 2 segundos
    setTimeout(() => {
      // Invocar la función del controlador con req y res
      controller.verCrearFormulario(req, res);
    }, 800);
  });




router.get('/:id', (req, res) => {
    // Aplicar un tiempo de espera de 2 segundos
    setTimeout(() => {
      // Invocar la función del controlador con req y res
      controller.obtenerFormularioId(req, res);
    }, 800);
});

router.post('/:id', (req, res) => {
    // Aplicar un tiempo de espera de 2 segundos
    setTimeout(() => {
      // Invocar la función del controlador con req y res
      controller.crearRespuesta(req, res);
    }, 800);
});



module.exports = router;