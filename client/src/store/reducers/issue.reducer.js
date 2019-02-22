import normalize from "../json.normalizr";
import {
    ISSUE_ADD_SUCCESS,
    ISSUE_LIST_SUCCESS,
    ISSUE_GET_SUCCESS
} from "../action.types";

const initialState = {
    list: null,
    lastCreated: null,
    current: null
};

const onIssueAdd = (state, { issue }) => {
    return {
        ...state,
        lastCreated: issue
    };
};

const onIssueGet = (state, { issue }) => {
    return {
        ...state,
        current: issue
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
        case ISSUE_GET_SUCCESS:
            return onIssueGet(state, data);
        case ISSUE_LIST_SUCCESS:
            return onIssueList(state, data);
        default:
            return state;
    }
};
