const cheerio = require('cheerio');
const Nightmare = require('nightmare');

const instance = new Nightmare();

async function init() {
    try {
        const body = await instance
            .goto('http://www.dota2.com/leaderboards/#europe')
            .wait('tbody tr:last-child .player_name')
            .evaluate(() => document.body.innerHTML) // eslint-disable-line 

        console.log(body);
        const $ = cheerio.load(body);
        const rows = $('tbody tr');
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

init();
