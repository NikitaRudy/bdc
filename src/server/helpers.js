function calculatePlayersProgress(current, prev) {
    return prev.map((player, i) => ({
        nickName: player.nickName,
        progress: calculatePlayerProgress(player, prev, current),
    })).filter(cur => Number.isFinite(cur.progress.bdcProgress));
}

function calculatePlayerProgress(player, prev, current) {
    const bdcPrevPosition = prev.findIndex(cur => cur.nickName === player.nickName);
    const leaderboardsPrevPosition = prev[bdcPrevPosition].rank;

    const bdcCurrentPosition = current.findIndex(cur => cur.nickName === player.nickName);
    const isOutOfTable = bdcCurrentPosition === -1;
    const leaderboardsCurrentPosition = (current[bdcCurrentPosition] && current[bdcCurrentPosition].rank) || 0;

    return {
        bdcProgress: isOutOfTable ? null : bdcPrevPosition - bdcCurrentPosition,
        leaderboardsProgress: isOutOfTable ? null : leaderboardsPrevPosition - leaderboardsCurrentPosition,
        bdcPrevPosition,
        leaderboardsPrevPosition,
        bdcCurrentPosition,
        leaderboardsCurrentPosition,

    };

}

module.exports = {
    calculatePlayersProgress,
};
