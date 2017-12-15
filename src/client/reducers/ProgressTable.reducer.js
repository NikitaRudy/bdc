import { REQUEST_PROGRESS_COMPLETE } from '../constants/ProgressTable.constants';

const initialState = { progress: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_PROGRESS_COMPLETE:
            return { ...state, progress: action.payload };
        default:
            return state;
    }
}
