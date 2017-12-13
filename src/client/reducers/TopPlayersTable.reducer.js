import { REQUEST_BELARUS_PLAYERS_COMPLETE } from '../constants/TopPlayersTable.constants';

const initialState = { players: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_BELARUS_PLAYERS_COMPLETE:
            return { ...state, players: action.payload };
        default:
            return state;
    }
}
