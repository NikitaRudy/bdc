import { fork } from 'redux-saga/effects';

import { watchRequestPlayers } from './TopPlayersTable.sagas';

export default function* rootSaga() {
    yield [
        fork(watchRequestPlayers),
    ];
}
