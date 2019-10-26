import { get } from '../utils';

export function getTopPlayers() {
    return get('/api/players');
}
