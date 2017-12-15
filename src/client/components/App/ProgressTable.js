import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

import { requestProgress } from '../../actions/ProgressTable.actions';

class ProgressTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestProgress();
    }

    formatProgressString(progress, prev, current) {
        if (progress === 0) {
            return 'no progress';
        }

        const progressString = progress > 0 ? `+${progress}` : progress;
        const fromTostring = `from ${prev} to ${current}`;

        return (
            <div>
                <div>{ progressString }</div><div>{ fromTostring }</div>
            </div>
        );
    }

    renderTableContent() {
        return this.props.progress.map((cur, i) => {
            const {
                progress: {
                    leaderboardsProgress,
                    bdcProgress,
                    bdcPrevPosition,
                    leaderboardsPrevPosition,
                    bdcCurrentPosition,
                    leaderboardsCurrentPosition,
                },
                nickName,
            } = cur;
            return (
                <tr key={ `${nickName}-${leaderboardsProgress}` }>
                    <th scope="row">{ i + 1 }</th>
                    <td>{ nickName }</td>
                    <td>
                        { this.formatProgressString(leaderboardsProgress, leaderboardsPrevPosition, leaderboardsCurrentPosition) }
                    </td>
                    <td>
                        { this.formatProgressString(bdcProgress, bdcPrevPosition, bdcCurrentPosition) }
                    </td>
                </tr>
            );
        });
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h4>Daily Progress</h4>
                <Table
                    bordered
                    className="bdc-table"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Leaderboard Progress</th>
                            <th>BDC Rank progress</th>
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

ProgressTable.propTypes = {
    requestProgress: propTypes.func,
    progress: propTypes.array,
};

export default connect(
    state => ({ progress: state.ProgressTable.progress }),
    { requestProgress }
)(ProgressTable);
