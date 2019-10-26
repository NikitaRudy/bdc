import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

import { requestBelarusPlayers } from '../../actions/TopPlayersTable.actions';
import TableHeader from './TableHeader';

const TopPlayersTable = ({ requestBelarusPlayers, players, snapshotDate }) => {
    useEffect(() => {
        requestBelarusPlayers();
    }, []);

    const headerContent = 'Top Players';
    const secondaryHeaderContent = `Updated hourly. Last update was ${snapshotDate.toLocaleString()}`;

    return (
        <div>
            <TableHeader
                headerContent={headerContent}
                secondaryHeaderContent={secondaryHeaderContent}
            />
            <Table bordered>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Leaderboard Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((cur, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{cur.nickName}</td>
                            <td>{cur.rank}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

TopPlayersTable.propTypes = {
    requestBelarusPlayers: propTypes.func,
    players: propTypes.array,
    snapshotDate: propTypes.object,
};

const mapState = (state, { location: { pathname } }) =>
    (pathname.includes('core')
        ? state.TopPlayersTable.core
        : state.TopPlayersTable.support);

const mapDispatch = { requestBelarusPlayers };

export default connect(
    mapState,
    mapDispatch
)(TopPlayersTable);
