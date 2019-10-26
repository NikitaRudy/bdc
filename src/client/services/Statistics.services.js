import { get } from '../utils';

export function getStatistics() {
    return get('/api/statistics');
}
