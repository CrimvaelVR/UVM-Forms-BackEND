const express = require('express');
const router = express.Router();
const controller = require('../controllers/formularios-c')
const controller2 = require('../controllers/respuestas-c')


// Ruta para crear un formulario (POST)
router.post('/crear', controller.crearFormulario);

// Ruta para mostrar el formulario de crear formularios (GET)
router.get('/crear', (req, res) => {
    // Renderizar el archivo EJS
    res.render('formularios-crear.ejs')
});

router.get('/:id', controller.obtenerFormularioId);

module.exports = router;