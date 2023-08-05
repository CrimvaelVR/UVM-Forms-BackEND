const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacto-c');

router.get('/', (req, res) => {

  res.render('contacto')
});

// Ruta para enviar un formulario (POST)


router.post('/', controller.enviarFormulario);


module.exports = router;