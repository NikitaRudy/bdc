import axios from 'axios';

export function getTopPlayers() {
    return axios.get('/players');
}
