const zlib = require('zlib');
const { promisify } = require('util');
const logger = require('./logger');
const { calculatePlayersProgress } = require('./helpers');
const { formatProgress } = require('./formatters');

const { TopPlayers, Snapshot } = require('../scrapper/models');

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

async function progressController(req, res) {
    try {
        const lastSnapshots = await Snapshot.find()
            .sort({ submitDate: -1 });

        const dailySnapshots = {
            prevRankings: lastSnapshots[1].toObject(),
            currentRankings: lastSnapshots[0].toObject(),
        };

        const weeklySnapshots = {
            prevRankings: lastSnapshots[6].toObject(),
            currentRankings: lastSnapshots[0].toObject(),
        };

        const monthlySnapshots = {
            prevRankings: lastSnapshots[30].toObject(),
            currentRankings: lastSnapshots[0].toObject(),
        };

        const progressData = {
            daily: formatProgress(dailySnapshots),
            weekly: formatProgress(weeklySnapshots),
            monthly: formatProgress(monthlySnapshots),
        };

        res.json(progressData).end();
    } catch (e) {
        logger.error('progressController', e);
        res.status(400).end();
    }
}

async function statisticsController(req, res) {
    try {
        const lastSnapshots = await Snapshot.find()
            .sort({ submitDate: -1 })
            .limit(2);

        let newestRankings = await TopPlayers.find();

        newestRankings = newestRankings[0].toObject();
        const prevRankings = lastSnapshots[1].toObject();
        const currentRankings = lastSnapshots[0].toObject();

        const bdcProgress = calculatePlayersProgress(currentRankings.players, prevRankings.players)
            .sort((a, b) => b.progress.leaderboardsProgress - a.progress.leaderboardsProgress);

        const newcomers = currentRankings.players
            .filter(cur => !prevRankings.players.some(player => player.nickName === cur.nickName));
        const departed = prevRankings.players
            .filter(cur => !currentRankings.players.some(player => player.nickName === cur.nickName));

        const percentage = ((newestRankings.players.length / newestRankings.lbPlayersCount) * 100).toFixed(2);

        res.json({
            departed,
            newcomers,
            percentage,
            lbPlayersCount: newestRankings.lbPlayersCount,
            bdcPlayersCount: newestRankings.players.length,
            topRank: newestRankings.players.slice(0, 3),
            topProgress: bdcProgress.slice(0, 3),
        }).end();
    } catch (e) {
        logger.error('statisticsController', e);
        res.status(400).end();
    }
}

module.exports = {
    indexController,
    playersController,
    progressController,
    statisticsController,
};
