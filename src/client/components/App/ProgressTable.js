import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Table, NavLink, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';

import { requestProgress, changeProgressFilter } from '../../actions/ProgressTable.actions';
import TableHeader from './TableHeader';
import ProgressRow from './ProgressRow';

class ProgressTable extends Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount() {
        this.props.requestProgress();
    }

    formatHeaderContent() {
        const { filter } = this.props;
        const prevString = this.props[filter].firstSnapshotDate.toLocaleString();
        const curString = this.props[filter].secondSnapshotDate.toLocaleString();
        const progressKeyString = filter[0].toUpperCase().concat(filter.slice(1));
        return {
            headerContent: `${progressKeyString} Progress`,
            secondaryHeaderContent: `The difference between ${prevString} and ${curString}`,
        };
    }

    handleFilterChange(e) {
        const filter = e.target.getAttribute('data-filter');
        this.props.changeProgressFilter(filter);
    }

    render() {
        const { headerContent, secondaryHeaderContent } = this.formatHeaderContent();
        const progressData = this.props[this.props.filter].progress;
        return (
            <div>
                <TableHeader
                    headerContent={ headerContent }
                    secondaryHeaderContent={ secondaryHeaderContent }
                />
                <Nav tabs>
                    <NavItem >
                        <NavLink
                            active={ this.props.filter === 'daily' }
                            style={ { color: 'black' } }
                            href="#"
                            onClick={ this.handleFilterChange }
                            data-filter="daily"
                        >Daily</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink
                            active={ this.props.filter === 'weekly' }
                            style={ { color: 'black' } }
                            href="#"
                            onClick={ this.handleFilterChange }
                            data-filter="weekly"
                        >Weekly</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink
                            active={ this.props.filter === 'monthly' }
                            style={ { color: 'black' } }
                            href="#"
                            onClick={ this.handleFilterChange }
                            data-filter="monthly"
                        >Monthly</NavLink>
                    </NavItem>
                </Nav>
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
                            progressData.map((cur, index) => {
                                const { progress, nickName } = cur;
                                const props = { ...progress, nickName, index };
                                return <ProgressRow key={ index } { ...props } />;
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
    changeProgressFilter: propTypes.func,
    filter: propTypes.string,
    daily: propTypes.object,
    weekly: propTypes.object,
    monthly: propTypes.object,
};

export default connect(
    state => ({
        daily: state.ProgressTable.daily,
        weekly: state.ProgressTable.weekly,
        monthly: state.ProgressTable.monthly,
        filter: state.ProgressTable.filter,
    }),
    {
        requestProgress,
        changeProgressFilter,
    }
)(ProgressTable);
