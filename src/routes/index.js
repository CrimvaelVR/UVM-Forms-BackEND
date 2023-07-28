const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-c')
const {cerrarSesion} = require('../controllers/usuario-c')
/*
router.get('/', (req, res) => {
    // Renderizar el archivo EJS
    res.render('index-usuarios', {user: 'Jose Escalona'})
});
*/

router.get('/',  controller.consultarFormularioUser);

router.post('/disconnect', cerrarSesion)

module.exports = router;