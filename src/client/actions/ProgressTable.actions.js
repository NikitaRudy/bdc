import {
    REQUEST_PROGRESS,
    REQUEST_PROGRESS_COMPLETE,
    CHANGE_PROGRESS_FILTER,
} from '../constants/ProgressTable.constants';

export const requestProgress = () => ({
    type: REQUEST_PROGRESS,
});

export const requestProgressComplete = data => ({
    type: REQUEST_PROGRESS_COMPLETE,
    payload: data,
});

export const changeProgressFilter = filter => ({
    type: CHANGE_PROGRESS_FILTER,
    payload: filter,
});
