import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

import { requestProgress } from '../../actions/ProgressTable.actions';
import TableHeader from './TableHeader';
import ProgressRow from './ProgressRow';

class ProgressTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestProgress();
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
                        {
                            this.props.progress.map((cur, index) => {
                                const { progress, nickName } = cur;
                                const props = { ...progress, nickName, index };
                                return <ProgressRow key={ nickName } { ...props } />;
                            })
                        }
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
