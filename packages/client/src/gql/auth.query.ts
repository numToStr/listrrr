import { useMutation, gql } from "@apollo/client";
import {
    MutationLoginArgs,
    LoginInput,
    AuthResponse,
    MutationSignupArgs,
    SignupInput
} from "../generated/graphql";
import { MutationHook, HandleMutation } from "../@types/types";

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
                    cache.writeData({
                        data: {
                            [authKey]: data.login
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
                    cache.writeData({
                        data: {
                            [authKey]: data.signup
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
