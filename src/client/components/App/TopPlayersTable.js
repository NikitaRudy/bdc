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

    renderTableContent() {
        return this.props.players.map((cur, i) => (
            <tr key={ cur.nickName }>
                <th scope="row">{ i + 1 }</th>
                <td>{ cur.nickName }</td>
                <td>{ cur.rank }</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <h4>Top Players</h4>
                <Table
                    bordered
                    className="bdc-table"
                >
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Leaderboard Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableContent() }
                    </tbody>
                </Table>
            </div>
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
