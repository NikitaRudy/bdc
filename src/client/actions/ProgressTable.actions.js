import {
    REQUEST_PROGRESS_COMPLETE,
    CHANGE_PROGRESS_FILTER,
} from '../constants/ProgressTable.constants';
import { getProgress } from '../services/ProgressTable.services';

export const requestProgress = () => async dispatch =>
    dispatch(requestProgressComplete(await getProgress()));

export const requestProgressComplete = data => ({
    type: REQUEST_PROGRESS_COMPLETE,
    payload: data,
});

export const changeProgressFilter = filter => ({
    type: CHANGE_PROGRESS_FILTER,
    payload: filter,
});
