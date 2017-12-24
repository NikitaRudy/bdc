import { REQUEST_STATISTICS_COMPLETE } from '../constants/Statistics.constants';

const initialState = {
    newcomers: [],
    percentage: 0,
    lbPlayersCount: 0,
    bdcPlayersCount: 0,
    topRank: [],
    topProgress: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_STATISTICS_COMPLETE:
            return { ...action.payload };
        default:
            return state;
    }
}
