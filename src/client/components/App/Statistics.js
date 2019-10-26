import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ListGroupItem, ListGroup, Progress, Table } from 'reactstrap';

import { requestStatistics } from '../../actions/Statistics.actions';
import ProgressValue from './ProgressTable/ProgressValue';

const Statistics = ({
    requestStatistics,
    newcomers,
    percentage,
    bdcPlayersCount,
    lbPlayersCount,
    topRank,
    topProgress,
}) => {
    useEffect(() => {
        requestStatistics();
    }, []);

    return (
        <section className="statistics">
            <h5>Top 3 Players</h5>
            <ListGroup>
                {topRank.map(cur => (
                    <ListGroupItem key={cur.nickName} className="list-item">
                        <span>{cur.nickName}</span>
                        <span>{cur.rank}</span>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <hr />
            <h5>Daily Progress Top 3</h5>
            <ListGroup>
                {topProgress.map((cur, i) => (
                    <ListGroupItem key={cur.nickName} className="list-item">
                        <span>{cur.nickName}</span>
                        <ProgressValue
                            index={i}
                            value={`+${cur.progress.leaderboardsProgress}`}
                            type="lb"
                            color="success"
                        />
                    </ListGroupItem>
                ))}
            </ListGroup>
            <div>
                <h5>Belarus players percentage in Leaderboards</h5>
                <div className="text-center">
                    {percentage}% {bdcPlayersCount} of {lbPlayersCount}
                </div>
                <Progress value={percentage} />
            </div>
        </section>
    );
};

Statistics.propTypes = {
    newcomers: propTypes.array,
    percentage: propTypes.number,
    lbPlayersCount: propTypes.number,
    bdcPlayersCount: propTypes.number,
    requestStatistics: propTypes.func,
    topPlayers: propTypes.array,
    topRank: propTypes.array,
    topProgress: propTypes.array,
};

export default connect(
    state => ({
        newcomers: state.Statistics.newcomers,
        percentage: +state.Statistics.percentage,
        lbPlayersCount: state.Statistics.lbPlayersCount,
        bdcPlayersCount: state.Statistics.bdcPlayersCount,
        topRank: state.Statistics.topRank,
        topProgress: state.Statistics.topProgress,
    }),
    { requestStatistics }
)(Statistics);
