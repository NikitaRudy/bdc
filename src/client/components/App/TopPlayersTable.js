import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

import { requestBelarusPlayers } from '../../actions/TopPlayersTable.actions';

class TopPlayersTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestBelarusPlayers();
    }

    render() {
        return (
            <Table
                hover
                bordered
                responsive
                className="top-players-table"
            >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Leaderboard Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.players.map((cur, i) => (
                            <tr key={ cur.nickName }>
                                <th scope="row">{ i + 1 }</th>
                                <td>{ cur.nickName }</td>
                                <td>{ cur.rank }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

TopPlayersTable.propTypes = {
    requestBelarusPlayers: propTypes.func,
    players: propTypes.array,
};

export default connect(
    state => ({ players: state.TopPlayersTable.players }),
    { requestBelarusPlayers }
)(TopPlayersTable);
