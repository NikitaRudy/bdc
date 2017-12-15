const express = require('express');

const router = express.Router();

const {
    indexController, playersController, progressController,
} = require('../controllers.js');

router.get('/api/players', playersController);

router.get('/api/progress', progressController);

router.get('*', indexController);

module.exports = router;
