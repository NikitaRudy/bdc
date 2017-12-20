const { updateRankings, saveDailySnapshot } = require('./services');

updateRankings(saveDailySnapshot).catch(e => console.error('an error occurred', e));