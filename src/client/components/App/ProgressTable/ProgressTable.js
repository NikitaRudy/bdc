import React, { useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import { Table, NavLink, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';

import {
    requestProgress,
    changeProgressFilter,
} from '../../../actions/ProgressTable.actions';
import TableHeader from '../TableHeader';
import ProgressRow from './ProgressRow';

const ProgressTable = (props) => {
    const { requestProgress, filter, changeProgressFilter } = props;
    const progressData = props[props.filter].progress;

    useEffect(() => {
        requestProgress();
    }, []);

    const handleFilterChange = useCallback((e) => {
        const filter = e.target.getAttribute('data-filter');
        changeProgressFilter(filter);
    }, []);

    const prevString = props[filter].firstSnapshotDate.toLocaleString();
    const curString = props[filter].secondSnapshotDate.toLocaleString();
    const progressKeyString = filter[0].toUpperCase().concat(filter.slice(1));

    const headerContent = `${progressKeyString} Progress`;
    const secondaryHeaderContent = `The difference between ${prevString} and ${curString}`;

    return (
        <div>
            <TableHeader
                headerContent={headerContent}
                secondaryHeaderContent={secondaryHeaderContent}
            />
            {/* <Nav tabs className="progress-tabs">
                <NavItem>
                    <NavLink
                        active={filter === 'daily'}
                        href="#"
                        onClick={handleFilterChange}
                        data-filter="daily"
                    >
                        Daily
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={filter === 'weekly'}
                        href="#"
                        onClick={handleFilterChange}
                        data-filter="weekly"
                    >
                        Weekly
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={filter === 'monthly'}
                        href="#"
                        onClick={handleFilterChange}
                        data-filter="monthly"
                    >
                        Monthly
                    </NavLink>
                </NavItem>
            </Nav> */}
            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Player</th>
                        <th>Leaderboard Progress</th>
                        <th>BDC Rank progress</th>
                    </tr>
                </thead>
                <tbody>
                    {progressData.map((cur, index) => {
                        const { progress, nickName } = cur;
                        const props = { ...progress, nickName, index };
                        return <ProgressRow key={index} {...props} />;
                    })}
                </tbody>
            </Table>
        </div>
    );
};

ProgressTable.propTypes = {
    requestProgress: propTypes.func,
    changeProgressFilter: propTypes.func,
    filter: propTypes.string,
    daily: propTypes.object,
    weekly: propTypes.object,
    monthly: propTypes.object,
};

const mapState = (state, { location: { pathname } }) => {
    return {
        ...(pathname.includes('core')
            ? state.ProgressTable.core
            : state.ProgressTable.support),
        filter: state.ProgressTable.filter,
    };
};

const mapDispatch = {
    requestProgress,
    changeProgressFilter,
};

export default connect(
    mapState,
    mapDispatch
)(ProgressTable);
