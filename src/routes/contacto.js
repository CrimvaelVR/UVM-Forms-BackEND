const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacto-c');

router.get('/', (req, res) => {
  setTimeout(() => {
    res.render('contacto')
  }, 800);
});

// Ruta para enviar un formulario (POST)

router.post('/', (req, res) => {
  setTimeout(() => {
    controller.enviarFormulario(req, res);
  }, 800);
});

module.exports = router;