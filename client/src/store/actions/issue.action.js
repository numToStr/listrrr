import {
    ISSUE_ADD_SUCCESS,
    ISSUE_ADD,
    ISSUE_LIST,
    ISSUE_LIST_SUCCESS,
    ISSUE_GET,
    ISSUE_GET_SUCCESS,
    ISSUE_CLEAR
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

export const issueList = params => ({
    type: ISSUE_LIST,
    http: true,
    payload: {
        method: "GET",
        url: "/issue/list",
        params
    },
    success: issueListSuccess,
    meta: {
        label: "issueList"
    }
});

const issueGetSuccess = data => ({
    type: ISSUE_GET_SUCCESS,
    data
});

export const issueGet = issueId => ({
    type: ISSUE_GET,
    http: true,
    payload: {
        method: "GET",
        url: `/issue/${issueId}`
    },
    success: issueGetSuccess,
    meta: {
        label: "issueGet"
    }
});

export const issueClear = () => ({
    type: ISSUE_CLEAR
});
