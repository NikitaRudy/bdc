const mongoose = require('mongoose');
const logger = require('./logger');

const TopPlayersSchema = new mongoose.Schema({});
const TopPlayers = mongoose.model('TopPlayers', TopPlayersSchema);

function indexController(req, res) {
    res.render('index');
}

async function playersController(req, res) {
    try {
        const topPlayers = await TopPlayers.find();
        res.json(topPlayers[0]).end();
    } catch (e) {
        logger.error('playersController', e);
        res.status(400).end(e);
    }
}

module.exports = {
    indexController,
    playersController,
};
