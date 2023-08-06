const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    setTimeout(() => {
      res.render('404')
    }, 800);
  });

module.exports = router;