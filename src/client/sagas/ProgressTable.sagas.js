import { put, call, takeEvery } from 'redux-saga/effects';

import { requestProgressComplete } from '../actions/ProgressTable.actions';
import { REQUEST_PROGRESS } from '../constants/ProgressTable.constants';
import { getProgress } from '../services/ProgressTable.services';

function* requestProgressWorker() {
    try {
        const { data } = yield call(getProgress);

        yield put(requestProgressComplete(data));
    } catch (err) {
        yield put({ type: 'REQUEST_PROGRESS_COMPLETE', payload: err });
    }
}

export function* watchRequestProgress() {
    yield takeEvery(REQUEST_PROGRESS, requestProgressWorker);
}
