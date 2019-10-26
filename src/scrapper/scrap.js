const puppeteer = require('puppeteer');

const { mapP, filterP } = require('./helpers');

const LEADERBOARDS_CORE_URL = 'http://www.dota2.com/leaderboards/#europe-1';
const LEADERBOARDS_SUPPORT_URL = 'http://www.dota2.com/leaderboards/#europe-2';
const KEY_STRING = 'by.gif';

async function scrapData() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const result = await Promise.all([
        scrapPlayersData(browser, 'support'),
        scrapPlayersData(browser, 'core'),
    ]);

    await browser.close();

    return result;
}

async function scrapPlayersData(browser, kind = 'core') {
    const page = await browser.newPage();

    const url = kind === 'core' ? LEADERBOARDS_CORE_URL : LEADERBOARDS_SUPPORT_URL;

    await page.goto(url);
    await page.waitForSelector('tbody tr:last-child .player_name');

    console.log(`loaded body from ${url}`);

    const allPlayersRows = await page.$$('tbody tr');

    console.log(`found ${allPlayersRows.length} rows`);

    const byPlayers = await filterP(allPlayersRows, async (el) => {
        const flagSrc = await el.evaluate((node) => {
            const flag = node.querySelector('div img');

            return flag && flag.getAttribute('src');
        });

        return flagSrc && flagSrc.includes(KEY_STRING);
    });

    console.log(`found ${byPlayers.length} ${kind} BY rows`);

    const topListData = await mapP(byPlayers, async row => ({
        rank: await row.$eval('td:first-child', e => +e.innerHTML),
        nickName: await row.$eval('td .player_name', e => e.innerHTML),
    }));

    console.log(`top list length: ${topListData.length}`, topListData[topListData.length - 1]);

    return {
        topListData,
        lbPlayersCount: allPlayersRows.length,
    };
}

module.exports = scrapData;
