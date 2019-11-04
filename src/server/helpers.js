const calculatePlayersProgress = (current, prev) =>
    prev
        .map(player => ({
            nickName: player.nickName,
            progress: calculatePlayerProgress(player, prev, current),
        }))
        .filter(player => player.progress !== null);

function calculatePlayerProgress(player, prev, current) {
    const bdcPrevPosition = prev.findIndex(cur => cur.nickName === player.nickName);
    const leaderboardsPrevPosition = prev[bdcPrevPosition].rank;

    const bdcCurrentPosition = current.findIndex(cur => cur.nickName === player.nickName);
    const leaderboardsCurrentPosition =
        current[bdcCurrentPosition] && current[bdcCurrentPosition].rank;

    return bdcCurrentPosition === -1
        ? null
        : {
            bdcProgress: bdcPrevPosition - bdcCurrentPosition,
            leaderboardsProgress:
                  leaderboardsPrevPosition - leaderboardsCurrentPosition,
            bdcPrevPosition: bdcPrevPosition + 1,
            leaderboardsPrevPosition,
            bdcCurrentPosition: bdcCurrentPosition + 1,
            leaderboardsCurrentPosition,
        };
}

const calculateBelarusPlayersPercentage = top =>
    ((top.players.length / top.lbPlayersCount) * 100).toFixed(2);

module.exports = {
    calculatePlayersProgress,
    calculateBelarusPlayersPercentage,
};
