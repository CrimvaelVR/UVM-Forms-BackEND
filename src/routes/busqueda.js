const express = require('express');
const router = express.Router();
const controller = require('../controllers/formularios-c')

router.get('/:titulo',  controller.consultarFormularioTitulo);

module.exports = router;