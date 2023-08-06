const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacto-c');

router.get('/', (req, res) => {
  setTimeout(() => {
    res.render('contacto')
  }, 1000);
});

// Ruta para enviar un formulario (POST)

router.post('/', (req, res) => {
  setTimeout(() => {
    controller.enviarFormulario(req, res);
  }, 2000);
});

module.exports = router;