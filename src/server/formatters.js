const { calculatePlayersProgress } = require('./helpers');

function formatProgress({ prevRankings, currentRankings }) {
    return {
        bdcProgress: calculatePlayersProgress(currentRankings.players, prevRankings.players)
            .sort((a, b) => b.progress.leaderboardsProgress - a.progress.leaderboardsProgress),
        firstSnapshotDate: prevRankings.submitDate,
        secondSnapshotDate: currentRankings.submitDate,
    };
}

module.exports = {
    formatProgress,
};
