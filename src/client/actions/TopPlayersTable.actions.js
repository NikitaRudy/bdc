import {
    REQUEST_BELARUS_PLAYERS,
    REQUEST_BELARUS_PLAYERS_COMPLETE,
} from '../constants/TopPlayersTable.constants';

export const requestBelarusPlayers = () => ({
    type: REQUEST_BELARUS_PLAYERS,
});

export const requestBelarusPlayersComplete = players => ({
    type: REQUEST_BELARUS_PLAYERS_COMPLETE,
    payload: players,
});
