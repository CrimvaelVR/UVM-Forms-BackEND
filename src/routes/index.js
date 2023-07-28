const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-c')

router.get('/', controller.consultarFormularioUser);


module.exports = router;