import { REQUEST_STATISTICS_COMPLETE } from '../constants/Statistics.constants';

const initialState = {
    core: {
        percentage: 0,
        lbPlayersCount: 0,
        bdcPlayersCount: 0,
        topRank: [],
    },
    support: {
        percentage: 0,
        lbPlayersCount: 0,
        bdcPlayersCount: 0,
        topRank: [],
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_STATISTICS_COMPLETE:
            return { ...action.payload };
        default:
            return state;
    }
}
