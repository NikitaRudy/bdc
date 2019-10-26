const calculatePlayersProgress = (current, prev) =>
    prev
        .map(player => ({
            nickName: player.nickName,
            progress: calculatePlayerProgress(player, prev, current),
        }))
        .filter(Boolean);

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

module.exports = {
    calculatePlayersProgress,
};
