import {
    ISSUE_ADD_SUCCESS,
    ISSUE_ADD,
    ISSUE_LIST,
    ISSUE_LIST_SUCCESS
} from "../action.types";

const issueAddSuccess = data => ({
    type: ISSUE_ADD_SUCCESS,
    data
});

export const issueAdd = data => ({
    type: ISSUE_ADD,
    http: true,
    payload: {
        method: "POST",
        url: "/issue",
        data
    },
    success: issueAddSuccess,
    meta: {
        label: "issueAdd"
    }
});

const issueListSuccess = data => ({
    type: ISSUE_LIST_SUCCESS,
    data
});

export const issueList = () => ({
    type: ISSUE_LIST,
    http: true,
    payload: {
        method: "GET",
        url: "/issue"
    },
    success: issueListSuccess,
    meta: {
        label: "issueList"
    }
});
