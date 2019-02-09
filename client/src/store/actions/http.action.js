import { HTTP_START, HTTP_SUCCESS, HTTP_FAILURE } from "../action.types";

export const httpStart = data => ({
    type: HTTP_START,
    data
});

export const httpSuccess = data => ({
    type: HTTP_SUCCESS,
    data
});

export const httpFailure = data => ({
    type: HTTP_FAILURE,
    data
});
