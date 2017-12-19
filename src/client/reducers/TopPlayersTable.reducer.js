import { REQUEST_BELARUS_PLAYERS_COMPLETE } from '../constants/TopPlayersTable.constants';

const initialState = { players: [], snapshotDate: new Date() };

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_BELARUS_PLAYERS_COMPLETE:
            return { ...action.payload };
        default:
            return state;
    }
}
