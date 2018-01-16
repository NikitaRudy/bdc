const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const mongoose = require('mongoose');

const { Snapshot, TopPlayers } = require('./models');
const { MONGO_PATH } = require('../config');

const LEADERBOARDS_URL = 'http://www.dota2.com/leaderboards/#europe';
const LIST_ID = 'list#1';
const KEY_STRING = 'by.gif';

mongoose.Promise = Promise;
mongoose.connect(MONGO_PATH, { useMongoClient: true });

const db = mongoose.connection;
db.once('open', console.info.bind(console, 'connected to the database'));
db.on('error', console.warn.bind(console, 'DATABASE ERROR:'));


const nigtmare = new Nightmare();

async function updateRankings(dbAction) {
    const body = await nigtmare
        .goto(LEADERBOARDS_URL)
        .wait('tbody tr:last-child .player_name')
        .evaluate(() => document.body.innerHTML)
        .end();

    const $ = cheerio.load(body);
    console.log(`loaded body from ${LEADERBOARDS_URL}: \n`, body.length);

    const allPlayers = $('tbody tr');
    console.log(`found ${allPlayers.length} rows`);

    const byPlayers = allPlayers.filter((i, el) => {
        const flagSrc = $(el).find('div img').attr('src');
        return flagSrc && flagSrc.indexOf(KEY_STRING) !== -1;
    });
    console.log(`found ${byPlayers.length} BY rows`);

    const topListData = byPlayers.map((i, el) => {
        const rank = +$(el).find('td:first-child').text();
        const nickName = $(el).find('td .player_name').text();
        return { rank, nickName };
    }).toArray();

    const options = { upsert: true, new: true };
    const updates = {
        players: topListData,
        submitDate: Date.now(),
        id: LIST_ID,
        lbPlayersCount: allPlayers.length,
    };

    console.log(`top list length: ${topListData.length}`);

    await dbAction({ updates, options });

    process.exit();
}

async function updateTopPlayers({ updates, options }) {
    await TopPlayers.findOneAndUpdate({ id: LIST_ID }, updates, options);

    console.log('top list was succesfully saved to the database');
}

async function saveDailySnapshot({ updates: data }) {
    const snapshot = new Snapshot(data);
    await snapshot.save();

    console.log('top list snapshot was succesfully saved to the database');
}

module.exports = {
    updateRankings,
    updateTopPlayers,
    saveDailySnapshot,
};
