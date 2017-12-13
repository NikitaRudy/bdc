const cheerio = require('cheerio');
const Nightmare = require('nightmare');

const BY_FLAG_IMG_SRC = 'http://community.edgecast.steamstatic.com/public/images/countryflags/by.gif';

const instance = new Nightmare();

async function getCurrentlRankings() {
    const body = await instance
        .goto('http://www.dota2.com/leaderboards/#europe')
        .wait('tbody tr:last-child .player_name')
        .evaluate(() => document.body.innerHTML) // eslint-disable-line 
        .end();

    const $ = cheerio.load(body);
    const byPlayers = $('tbody tr')
        .filter((i, el) => $(el).find('div img').attr('src') === BY_FLAG_IMG_SRC)
        .map((i, el) => {
            const rank = +$(el).find('td:first-child').text();
            const nickName = $(el).find('td .player_name').text();
            return { rank, nickName };
        }).toArray();

    return byPlayers;
}


module.exports = {
    getCurrentlRankings,
};
