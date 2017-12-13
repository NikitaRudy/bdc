import { put, call, takeEvery } from 'redux-saga/effects';

import { requestBelarusPlayersComplete } from '../actions/TopPlayersTable.actions';
import { REQUEST_BELARUS_PLAYERS } from '../constants/TopPlayersTable.constants';
import { getTopPlayers } from '../services/TopPlayersTable.services';

function* requestPlayersWorker() {
    try {
        const { data: { players } } = yield call(getTopPlayers);
        players.sort((a, b) => a.rank - b.rank);
        yield put(requestBelarusPlayersComplete(players));
    } catch (err) {
        yield put({ type: 'REQUEST_BELARUS_PLAYERS_FAILED', payload: err });
    }
}

export function* watchRequestPlayers() {
    yield takeEvery(REQUEST_BELARUS_PLAYERS, requestPlayersWorker);
}
