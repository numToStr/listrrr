import { useMutation, gql } from "@apollo/client";
import {
    MutationLoginArgs,
    LoginInput,
    AuthResponse,
    MutationSignupArgs,
    SignupInput
} from "../generated/graphql";
import { MutationHook, HandleMutation } from "../@types/types";
import { TokenUtil } from "../utils/token";

const authKey: AuthResponse["__typename"] = "AuthResponse";

const LOGIN = gql`
    mutation Login($data: LoginInput!) {
        login(data: $data) {
            user {
                _id
                username
                email
            }
            auth {
                token
                role
            }
        }
    }
`;

type LoginResponse = {
    login: AuthResponse;
};

export const useLoginMutation: MutationHook<
    LoginResponse,
    MutationLoginArgs,
    LoginInput
> = options => {
    const [mutation, meta] = useMutation<LoginResponse, MutationLoginArgs>(
        LOGIN,
        {
            update(cache, { data }) {
                if (data) {
                    const d = data.login;

                    TokenUtil.setToken(d.auth.token);
                    cache.writeData({
                        data: {
                            [authKey]: d
                        }
                    });
                }
            },
            ...options
        }
    );

    const handleLogin: HandleMutation<LoginInput> = values => {
        mutation({
            variables: {
                data: values
            }
        });
    };

    return [handleLogin, meta];
};

const SIGNUP = gql`
    mutation Signup($data: SignupInput!) {
        signup(data: $data) {
            user {
                _id
                username
                email
            }
            auth {
                token
                role
            }
        }
    }
`;

type SignupResponse = {
    signup: AuthResponse;
};

export const useSignupMutation: MutationHook<
    SignupResponse,
    MutationSignupArgs,
    SignupInput
> = options => {
    const [mutation, meta] = useMutation<SignupResponse, MutationSignupArgs>(
        SIGNUP,
        {
            update(cache, { data }) {
                if (data) {
                    const d = data.signup;

                    TokenUtil.setToken(d.auth.token);
                    cache.writeData({
                        data: {
                            [authKey]: d
                        }
                    });
                }
            },
            ...options
        }
    );

    const handleLogin: HandleMutation<SignupInput> = values => {
        mutation({
            variables: {
                data: values
            }
        });
    };

    return [handleLogin, meta];
};
