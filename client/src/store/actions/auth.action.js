import {
    AUTHENTICATE,
    AUTHENTICATE_SUCCESS,
    LOGIN,
    SIGNUP
} from "../action.types";

const authenticateSuccess = data => ({
    type: AUTHENTICATE_SUCCESS,
    data
});

export const authenticate = () => ({
    type: AUTHENTICATE,
    http: true,
    payload: {
        method: "GET",
        url: "/user"
    },
    success: authenticateSuccess,
    meta: {
        label: "authenticate",
        isProtected: true
    }
});

export const login = data => ({
    type: LOGIN,
    http: true,
    payload: {
        method: "POST",
        url: "/auth/login",
        data
    },
    success: authenticateSuccess,
    meta: {
        label: "login"
    }
});

export const signup = data => ({
    type: SIGNUP,
    http: true,
    payload: {
        method: "POST",
        url: "/auth/signup",
        data
    },
    success: authenticateSuccess,
    meta: {
        label: "signup"
    }
});
