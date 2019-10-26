const scrapData = require('./scrap');
const { Snapshot, TopPlayers } = require('./models');
const dbConnect = require('../server/db');

dbConnect();

async function updateRankings(dbAction) {
    const [supportStats, coreStats] = await scrapData();

    const coreUpdates = {
        players: coreStats.topListData,
        submitDate: Date.now(),
        lbPlayersCount: coreStats.lbPlayersCount,
        kind: 'core',
    };

    const supportUpdates = {
        players: supportStats.topListData,
        submitDate: Date.now(),
        lbPlayersCount: supportStats.lbPlayersCount,
        kind: 'support',
    };

    await dbAction({ kind: 'core', updates: coreUpdates });
    await dbAction({ kind: 'support', updates: supportUpdates });

    process.exit(0);
}

async function updateTopPlayers({ updates, kind }) {
    await TopPlayers.findOneAndUpdate({ kind }, updates, {
        upsert: true,
        new: true,
    });

    console.log('top list was succesfully saved to the database');
}

async function saveDailySnapshot({ kind, updates: data }) {
    const snapshot = new Snapshot({ ...data, kind });
    await snapshot.save();

    console.log('top list snapshot was succesfully saved to the database');
}

module.exports = {
    updateRankings,
    updateTopPlayers,
    saveDailySnapshot,
};
