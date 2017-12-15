import { REQUEST_PROGRESS, REQUEST_PROGRESS_COMPLETE } from '../constants/ProgressTable.constants';

export const requestProgress = () => ({
    type: REQUEST_PROGRESS,
});

export const requestProgressComplete = data => ({
    type: REQUEST_PROGRESS_COMPLETE,
    payload: data,
});
