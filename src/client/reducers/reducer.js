import { combineReducers } from 'redux';

import topPlayersTableReducer from './TopPlayersTable.reducer';
import progressTableReducer from './ProgressTable.reducer';

const reducer = combineReducers({
    TopPlayersTable: topPlayersTableReducer,
    ProgressTable: progressTableReducer,
});

export default reducer;
