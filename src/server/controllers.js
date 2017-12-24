const logger = require('./logger');
const { calculatePlayersProgress } = require('./helpers');

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
            .sort({ submitDate: -1 })
            .limit(2);
        const prevRankings = lastSnapshots[1].toObject();
        const currentRankings = lastSnapshots[0].toObject();
        const bdcProgress = calculatePlayersProgress(currentRankings.players, prevRankings.players)
            .sort((a, b) => b.progress.leaderboardsProgress - a.progress.leaderboardsProgress);

        const progressData = {
            bdcProgress,
            firstSnapshotDate: prevRankings.submitDate,
            secondSnapshotDate: currentRankings.submitDate,
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

        const prevRankings = lastSnapshots[1].toObject();
        const currentRankings = lastSnapshots[0].toObject();

        const newcomers = currentRankings.players
            .filter(cur => !prevRankings.players.some(player => player.nickName === cur.nickName));
        const departed = prevRankings.players
            .filter(cur => !currentRankings.players.some(player => player.nickName === cur.nickName));

        const percentage = ((currentRankings.players.length / currentRankings.lbPlayersCount) * 100).toFixed(2);

        res.json({
            departed,
            newcomers,
            percentage,
            lbPlayersCount: currentRankings.lbPlayersCount,
            bdcPlayersCount: currentRankings.players.length,
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
