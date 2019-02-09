import { HTTP_START, HTTP_SUCCESS, HTTP_FAILURE } from "../action.types";

const initialState = {
    request: {
        // it should be true by default bcz of autosignin
        authenticate: true
    },
    error: {}
};

const onHttpStart = (state, { label }) => ({
    ...state,
    request: {
        [label]: true
    }
});

const onHttpSuccess = (state, { label }) => ({
    request: {
        [label]: false
    }
});

const onHttpFailure = (state, { label, error }) => ({
    request: {
        [label]: false
    },
    error: {
        [label]: error
    }
});

export default (state = initialState, { type, data }) => {
    switch (type) {
        case HTTP_START:
            return onHttpStart(state, data);
        case HTTP_SUCCESS:
            return onHttpSuccess(state, data);
        case HTTP_FAILURE:
            return onHttpFailure(state, data);
        default:
            return state;
    }
};
