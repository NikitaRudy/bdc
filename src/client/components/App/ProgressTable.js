import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

import { requestProgress } from '../../actions/ProgressTable.actions';
import TableHeader from './TableHeader';

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

    formatHeaderContent() {
        const { firstSnapshotDate, secondSnapshotDate } = this.props;
        return {
            headerContent: 'Daily Progress',
            secondaryHeaderContent: `The difference between ${firstSnapshotDate.toLocaleString()} and ${secondSnapshotDate.toLocaleString()}`,
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
    firstSnapshotDate: propTypes.object,
    secondSnapshotDate: propTypes.object,
};

export default connect(
    state => ({
        progress: state.ProgressTable.progress,
        firstSnapshotDate: state.ProgressTable.firstSnapshotDate,
        secondSnapshotDate: state.ProgressTable.secondSnapshotDate,
    }),
    { requestProgress }
)(ProgressTable);
