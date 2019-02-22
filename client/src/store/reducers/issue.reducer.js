import normalize from "../json.normalizr";
import { ISSUE_ADD_SUCCESS, ISSUE_LIST_SUCCESS } from "../action.types";

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

const onIssueList = (state, { issues }) => {
    return {
        ...state,
        list: normalize({ issues }, { entity: "issues" }).issues
    };
};

export default (state = initialState, { type, data }) => {
    switch (type) {
        case ISSUE_ADD_SUCCESS:
            return onIssueAdd(state, data);
        case ISSUE_LIST_SUCCESS:
            return onIssueList(state, data);
        default:
            return state;
    }
};
