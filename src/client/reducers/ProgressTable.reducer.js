import {
    REQUEST_PROGRESS_COMPLETE,
    CHANGE_PROGRESS_FILTER,
} from '../constants/ProgressTable.constants';

const initialState = {
    core: {
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
    },
    support: {
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
    },
    filter: 'daily',
};

const prepareProgress = progress =>
    Object.keys(progress).reduce((result, progressType) => {
        result[progressType] = {
            progress: progress[progressType].bdcProgress,
            firstSnapshotDate: new Date(progress[progressType].firstSnapshotDate),
            secondSnapshotDate: new Date(progress[progressType].secondSnapshotDate),
        };

        return result;
    }, {});

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_PROGRESS_COMPLETE:
            return {
                ...state,
                core: prepareProgress(action.payload.core),
                support: prepareProgress(action.payload.support),
            };
        case CHANGE_PROGRESS_FILTER:
            return { ...state, filter: action.payload };
        default:
            return state;
    }
}
