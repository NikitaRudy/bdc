import React from 'react';
import propTypes from 'prop-types';
import { ListGroupItem, ListGroup, Progress } from 'reactstrap';

const TopDashboard = ({
    percentage,
    bdcPlayersCount,
    lbPlayersCount,
    topRank,
    kind,
}) => (
    <div>
        <h5>Top 3 {kind} Players</h5>
        <ListGroup>
            {topRank.map(cur => (
                <ListGroupItem key={cur.nickName} className="list-item">
                    <span>{cur.nickName}</span>
                    <span>{cur.rank}</span>
                </ListGroupItem>
            ))}
        </ListGroup>
        <div>
            <h5>BY players percentage in Leaderboards</h5>
            <div className="text-center">
                {+percentage}% {bdcPlayersCount} of {lbPlayersCount}
            </div>
            <Progress className="dashboard-progress-bar" value={percentage} />
        </div>
    </div>
);

TopDashboard.propTypes = {
    percentage: propTypes.oneOfType([propTypes.number, propTypes.string]),
    lbPlayersCount: propTypes.number,
    bdcPlayersCount: propTypes.number,
    topRank: propTypes.array,
    kind: propTypes.string,
};

export default TopDashboard;
