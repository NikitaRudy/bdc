import { put, call, takeEvery } from 'redux-saga/effects';

import { requestProgressComplete } from '../actions/ProgressTable.actions';
import { REQUEST_PROGRESS } from '../constants/ProgressTable.constants';
import { getProgress } from '../services/ProgressTable.services';

function* requestProgressWorker() {
    try {
        const { data: { daily, weekly, monthly } } = yield call(getProgress);
        const progressData = {
            daily: {
                progress: daily.bdcProgress.slice(),
                firstSnapshotDate: new Date(daily.firstSnapshotDate),
                secondSnapshotDate: new Date(daily.secondSnapshotDate),
            },
            weekly: {
                progress: weekly.bdcProgress.slice(),
                firstSnapshotDate: new Date(weekly.firstSnapshotDate),
                secondSnapshotDate: new Date(weekly.secondSnapshotDate),
            },
            monthly: {
                progress: monthly.bdcProgress.slice(),
                firstSnapshotDate: new Date(monthly.firstSnapshotDate),
                secondSnapshotDate: new Date(monthly.secondSnapshotDate),
            },
        };

        yield put(requestProgressComplete(progressData));
    } catch (err) {
        yield put({ type: 'REQUEST_PROGRESS_COMPLETE', payload: err });
    }
}

export function* watchRequestProgress() {
    yield takeEvery(REQUEST_PROGRESS, requestProgressWorker);
}
