const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-c')
const checkRole = require('../middlewares/verifyRole')
/*
router.get('/', (req, res) => {
    // Renderizar el archivo EJS
    res.render('index-usuarios', {user: 'Jose Escalona'})
});
*/

router.get('/',

    function(req, res, next){
        var roles = ["admin"];
        checkRole(req, res, next, roles)
    }, 

    controller.consultarFormularioUser);
module.exports = router;