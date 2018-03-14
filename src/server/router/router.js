const express = require('express');

const router = express.Router();

const {
    indexController,
    playersController,
    progressController,
    statisticsController,
} = require('../controllers.js');

router.get('/api/players', playersController);

router.get('/api/progress', progressController);

router.get('/api/statistics', statisticsController);

router.get('*', indexController);

module.exports = router;
