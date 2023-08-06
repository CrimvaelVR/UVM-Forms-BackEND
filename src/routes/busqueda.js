const express = require('express');
const router = express.Router();
const controller = require('../controllers/formularios-c')

router.get('/:titulo',  );

router.get('/:titulo', (req, res) => {
    // Aplicar un tiempo de espera de 2 segundos
    setTimeout(() => {
      // Invocar la función del controlador con req y res
      controller.consultarFormularioTitulo(req, res);
    }, 2000);
  });

  
module.exports = router;