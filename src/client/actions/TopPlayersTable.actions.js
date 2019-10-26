import { REQUEST_BELARUS_PLAYERS_COMPLETE } from '../constants/TopPlayersTable.constants';
import { getTopPlayers } from '../services/TopPlayersTable.services';

export const requestBelarusPlayers = () => async dispatch =>
    dispatch(requestBelarusPlayersComplete(await getTopPlayers()));

export const requestBelarusPlayersComplete = players => ({
    type: REQUEST_BELARUS_PLAYERS_COMPLETE,
    payload: players,
});
