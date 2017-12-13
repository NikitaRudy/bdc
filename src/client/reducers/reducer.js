import { combineReducers } from 'redux';

import topPlayersTableReducer from './TopPlayersTable.reducer';

const reducer = combineReducers({
    TopPlayersTable: topPlayersTableReducer,
});

export default reducer;
