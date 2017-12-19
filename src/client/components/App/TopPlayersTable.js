import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

import { requestBelarusPlayers } from '../../actions/TopPlayersTable.actions';
import TableHeader from './TableHeader';

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

    formatHeaderContent() {
        return {
            headerContent: 'Top Players',
            secondaryHeaderContent: `Updated hourly. Last update was ${this.props.snapshotDate.toLocaleString()}`,
        };
    }

    render() {
        const { headerContent, secondaryHeaderContent } = this.formatHeaderContent();
        return (
            <div>
                <TableHeader
                    headerContent={ headerContent }
                    secondaryHeaderContent={ secondaryHeaderContent }
                />
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
    snapshotDate: propTypes.object,
};

export default connect(
    state => ({
        players: state.TopPlayersTable.players,
        snapshotDate: state.TopPlayersTable.snapshotDate,
    }),
    { requestBelarusPlayers }
)(TopPlayersTable);
