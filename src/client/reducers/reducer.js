import { combineReducers } from 'redux';

import topPlayersTableReducer from './TopPlayersTable.reducer';
import progressTableReducer from './ProgressTable.reducer';
import statisticsReducer from './Statistics.reducer';

const reducer = combineReducers({
    TopPlayersTable: topPlayersTableReducer,
    ProgressTable: progressTableReducer,
    Statistics: statisticsReducer,
});

export default reducer;
