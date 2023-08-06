const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-c')
const {cerrarSesion} = require('../controllers/usuario-c')
const checkRole = require('../middlewares/verifyRole')
/*
router.get('/', (req, res) => {
    // Renderizar el archivo EJS
    res.render('index-usuarios', {user: 'Jose Escalona'})
});
*/


router.get('/', (req, res) => {
    // Aplicar un tiempo de espera de 2 segundos
    setTimeout(() => {
      // Invocar la función del controlador con req y res
      controller.consultarFormularioUser(req, res);
    }, 800);
  });

router.post('/disconnect', (req, res) => {
    // Aplicar un tiempo de espera de 2 segundos
    setTimeout(() => {
      // Invocar la función del controlador con req y res
      cerrarSesion(req, res);
    }, 800);
  });

module.exports = router;