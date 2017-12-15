import axios from 'axios';

export function getProgress() {
    return axios.get('/api/progress');
}
