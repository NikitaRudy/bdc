import { REQUEST_STATISTICS_COMPLETE } from '../constants/Statistics.constants';

const initialState = {
    newcomers: [],
    departed: [],
    percentage: 0,
    lbPlayersCount: 0,
    bdcPlayersCount: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_STATISTICS_COMPLETE:
            return { ...action.payload };
        default:
            return state;
    }
}
