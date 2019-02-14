import { ISSUE_ADD_SUCCESS, ISSUE_ADD } from "../action.types";

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
