import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestStatistics } from '../../../actions/Statistics.actions';
import TopDashboard from './TopDashboard';

const Statistics = ({ core, support, requestStatistics }) => {
    useEffect(() => {
        requestStatistics();
    }, []);

    return (
        <section className="statistics">
            <TopDashboard kind="core" { ...core } />
            <TopDashboard kind="support" { ...support } />
        </section>
    );
};

const mapState = state => state.Statistics;
const mapDispatch = { requestStatistics };

Statistics.propTypes = {
    core: propTypes.object,
    support: propTypes.object,
    requestStatistics: propTypes.func,
};

export default connect(
    mapState,
    mapDispatch
)(Statistics);
