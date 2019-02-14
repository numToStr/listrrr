import { ISSUE_ADD_SUCCESS } from "../action.types";

const initialState = {
    list: [],
    lastCreated: null
};

const onIssueAdd = (state, { issue }) => {
    return {
        ...state,
        list: [issue, ...state.list],
        lastCreated: issue
    };
};

export default (state = initialState, { type, data }) => {
    switch (type) {
        case ISSUE_ADD_SUCCESS:
            return onIssueAdd(state, data);
        default:
            return state;
    }
};
