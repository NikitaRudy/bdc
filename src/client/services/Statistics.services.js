import axios from 'axios';

export function getStatistics() {
    return axios.get('/api/statistics');
}
