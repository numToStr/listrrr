import { DASHBOARD_SUCCESS } from "../action.types";

const initState = null;

const onDashboardSuccess = (state, data) => {
    return data;
};

const reducer = (state = initState, { type, data }) => {
    switch (type) {
        case DASHBOARD_SUCCESS:
            return onDashboardSuccess(state, data);
        default:
            return state;
    }
};

export default reducer;
