const logger = require('./logger');
const { formatProgress } = require('./formatters');
const { calculateBelarusPlayersPercentage } = require('./helpers');
const { TopPlayers, Snapshot } = require('../scrapper/models');

async function playersController(req, res) {
    try {
        const [core, support] = await Promise.all([
            TopPlayers.findOne({ kind: 'core' }),
            TopPlayers.findOne({ kind: 'support' }),
        ]);

        res.json({ core, support }).end();
    } catch (e) {
        logger.error('playersController', e);
        res.status(400).end(e);
    }
}

async function progressController(req, res) {
    try {
        const [lastCoreSnapshots, lastSupportSnapshots] = await Promise.all([
            Snapshot.find({ kind: 'core' })
                .sort({ submitDate: -1 })
                .lean(),
            Snapshot.find({ kind: 'support' })
                .sort({ submitDate: -1 })
                .lean(),
        ]);

        const dailyCoreSnapshots = {
            prevRankings: lastCoreSnapshots[1],
            currentRankings: lastCoreSnapshots[0],
        };

        const dailySupportSnapshots = {
            prevRankings: lastSupportSnapshots[1],
            currentRankings: lastCoreSnapshots[0],
        };

        const progressData = {
            core: {
                daily: formatProgress(dailyCoreSnapshots),
            },
            support: {
                daily: formatProgress(dailySupportSnapshots),
            },
        };

        res.json(progressData).end();
    } catch (e) {
        logger.error('progressController', e);
        res.status(400).end();
    }
}

async function statisticsController(req, res) {
    try {
        const [coreTop, supportTop] = await TopPlayers.find().lean();

        res.json({
            core: {
                percentage: calculateBelarusPlayersPercentage(coreTop),
                lbPlayersCount: coreTop.lbPlayersCount,
                bdcPlayersCount: coreTop.players.length,
                topRank: coreTop.players.slice(0, 3),
            },
            support: {
                percentage: calculateBelarusPlayersPercentage(supportTop),
                lbPlayersCount: supportTop.lbPlayersCount,
                bdcPlayersCount: supportTop.players.length,
                topRank: supportTop.players.slice(0, 3),
            },
        }).end();
    } catch (e) {
        logger.error('statisticsController', e);
        res.status(400).end();
    }
}

module.exports = {
    playersController,
    progressController,
    statisticsController,
};
