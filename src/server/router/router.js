const express = require('express');

const router = express.Router();

const { getCurrentlRankings } = require('../services');

router.get('/', async (req, res) => {
    const rankings = await getCurrentlRankings();
    res.json(rankings).end();
});


module.exports = router;
