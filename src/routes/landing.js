const express = require('express');
const router = express.Router();
const controller = require('../controllers/landing-c')



router.get('/', (req, res) => {
    setTimeout(() => {
    controller.consultarUser(req,res)
    }, 800);
});


module.exports = router;