const { updateRankings, updateTopPlayers } = require('./services');

updateRankings(updateTopPlayers).catch(e => console.error('an error occurred', e));
