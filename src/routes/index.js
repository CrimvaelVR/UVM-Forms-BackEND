const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-c')

/*
router.get('/', (req, res) => {
    // Renderizar el archivo EJS
    res.render('index-usuarios', {user: 'Jose Escalona'})
});
*/

router.get('/',  controller.consultarFormularioUser);


module.exports = router;