import { REQUEST_BELARUS_PLAYERS_COMPLETE } from '../constants/TopPlayersTable.constants';

const initialState = {
    core: { players: [], snapshotDate: new Date() },
    support: { players: [], snapshotDate: new Date() },
};

const prepareTopListData = list => ({
    ...list,
    snapshotDate: new Date(list.submitDate),
});

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_BELARUS_PLAYERS_COMPLETE: {
            const { core, support } = action.payload;

            return {
                ...state,
                core: prepareTopListData(core),
                support: prepareTopListData(support),
            };
        }
        default:
            return state;
    }
}
