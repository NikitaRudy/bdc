import { REQUEST_PROGRESS_COMPLETE } from '../constants/ProgressTable.constants';

const initialState = {
    progress: [],
    firstSnapshotDate: new Date(),
    secondSnapshotDate: new Date(),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_PROGRESS_COMPLETE:
            return { ...action.payload };
        default:
            return state;
    }
}
