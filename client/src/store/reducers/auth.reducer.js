import {
    LOGIN_SUCCESS,
    SIGNUP_SUCCESS,
    AUTHENTICATE_SUCCESS
} from "../action.types";

const initState = {
    user: null
};

const onAuthSuccess = (state, { user }) => {
    return {
        ...state,
        user
    };
};

const reducer = (state = initState, { type, data }) => {
    switch (type) {
        case LOGIN_SUCCESS:
            return onAuthSuccess(state, data);
        case SIGNUP_SUCCESS:
            return onAuthSuccess(state, data);
        case AUTHENTICATE_SUCCESS:
            return onAuthSuccess(state, data);
        default:
            return state;
    }
};

export default reducer;
