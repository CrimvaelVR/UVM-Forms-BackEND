const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacto-c');

router.get('/', controller.consultarUser);

router.post('/', controller.enviarFormulario);

router.use((req ,res) => {
  res.status(404).render('404', {mensaje: 'Página no encontrada'})
})

module.exports = router;