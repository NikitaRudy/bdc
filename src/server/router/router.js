const express = require('express');

const router = express.Router();

const { indexController, playersController } = require('../controllers.js');

router.get('/', indexController);

router.get('/players', playersController);


module.exports = router;
