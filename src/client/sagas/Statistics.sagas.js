import { put, call, takeEvery } from 'redux-saga/effects';

import { requestStatisticsComplete } from '../actions/Statistics.actions';
import { REQUEST_STATISTICS } from '../constants/Statistics.constants';
import { getStatistics } from '../services/Statistics.services';

function* requestStatisticsWorker() {
    try {
        const { data } = yield call(getStatistics);
        yield put(requestStatisticsComplete(data));
    } catch (err) {
        yield put({ type: 'REQUEST_STATISTICS_FAILED', payload: err });
    }
}

export function* watchRequestStatistics() {
    yield takeEvery(REQUEST_STATISTICS, requestStatisticsWorker);
}
