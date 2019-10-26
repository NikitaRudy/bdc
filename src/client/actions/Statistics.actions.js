import { REQUEST_STATISTICS_COMPLETE } from '../constants/Statistics.constants';
import { getStatistics } from '../services/Statistics.services';

export const requestStatistics = () => async (dispatch) => {
    const data = await getStatistics();
    dispatch(requestStatisticsComplete(data));
};

export const requestStatisticsComplete = data => ({
    type: REQUEST_STATISTICS_COMPLETE,
    payload: data,
});
