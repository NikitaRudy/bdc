import { get } from '../utils';

export function getProgress() {
    return get('/api/progress');
}
