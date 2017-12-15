import axios from 'axios';

export function getTopPlayers() {
    return axios.get('/api/players');
}
