import {
    REQUEST_STATISTICS,
    REQUEST_STATISTICS_COMPLETE,
} from '../constants/Statistics.constants';

export const requestStatistics = () => ({
    type: REQUEST_STATISTICS,
});

export const requestStatisticsComplete = data => ({
    type: REQUEST_STATISTICS_COMPLETE,
    payload: data,
});
