import { fork } from 'redux-saga/effects';

import { watchRequestPlayers } from './TopPlayersTable.sagas';
import { watchRequestProgress } from './ProgressTable.sagas';
import { watchRequestStatistics } from './Statistics.sagas';

export default function* rootSaga() {
    yield [
        fork(watchRequestPlayers),
        fork(watchRequestProgress),
        fork(watchRequestStatistics),
    ];
}
