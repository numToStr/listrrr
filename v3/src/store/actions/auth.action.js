import {
    AUTHENTICATE,
    AUTHENTICATE_SUCCESS,
    LOGIN,
    LOGIN_SUCCESS,
    SIGNUP,
    SIGNUP_SUCCESS
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
        url: "/auth"
    },
    success: authenticateSuccess,
    meta: {
        label: "authenticate",
        isProtected: true
    }
});

const loginSuccess = data => ({
    type: LOGIN_SUCCESS,
    data
});

export const login = data => ({
    type: LOGIN,
    http: true,
    payload: {
        method: "POST",
        url: "/auth/login",
        data
    },
    success: loginSuccess,
    meta: {
        label: "login"
    }
});

const signupSuccess = data => ({
    type: SIGNUP_SUCCESS,
    data
});

export const signup = data => ({
    type: SIGNUP,
    http: true,
    payload: {
        method: "POST",
        url: "/auth/signup",
        data
    },
    success: signupSuccess,
    meta: {
        label: "signup"
    }
});
