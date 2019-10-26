const express = require('express');

const router = express.Router();

const {
    playersController,
    progressController,
    statisticsController,
} = require('./controllers.js');

router.get('/api/players', playersController);
router.get('/api/progress', progressController);
router.get('/api/statistics', statisticsController);

module.exports = router;
