const express = require('express');
const router = express.Router();
const controller = require('../controllers/landing-c')

router.get('/', controller.consultarUser);

module.exports = router;