import { REQUEST_PROGRESS_COMPLETE, CHANGE_PROGRESS_FILTER } from '../constants/ProgressTable.constants';

const initialState = {
    daily: {
        progress: [],
        firstSnapshotDate: new Date(),
        secondSnapshotDate: new Date(),
    },
    weekly: {
        progress: [],
        firstSnapshotDate: new Date(),
        secondSnapshotDate: new Date(),
    },
    monthly: {
        progress: [],
        firstSnapshotDate: new Date(),
        secondSnapshotDate: new Date(),
    },
    filter: 'daily',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_PROGRESS_COMPLETE:
            return { ...state, ...action.payload };
        case CHANGE_PROGRESS_FILTER:
            return { ...state, filter: action.payload };
        default:
            return state;
    }
}
