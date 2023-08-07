const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacto-c');

router.get('/', (req, res) => {
  setTimeout(() => {
    controller.consultarUser(req, res)
  }, 800);
});

// Ruta para enviar un formulario (POST)

router.post('/', (req, res) => {
  setTimeout(() => {
    controller.enviarFormulario(req, res);
  }, 800);
});


router.use((req ,res) => {
  res.status(404).render('404', {mensaje: 'Página no encontrada'})
})

module.exports = router;