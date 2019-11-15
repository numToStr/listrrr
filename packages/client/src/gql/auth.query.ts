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
import { useMyApolloContext } from "../components/ApolloContext";
import { USER_FRAGMENT } from "./user.query";

const AUTH_FRAGMENT = gql`
    fragment AuthFragment on AuthResponse {
        user {
            ...UserFragment
        }
        auth {
            token
            role
        }
    }
    ${USER_FRAGMENT}
`;

const LOGIN = gql`
    mutation Login($data: LoginInput!) {
        login(data: $data) {
            ...AuthFragment
        }
    }
    ${AUTH_FRAGMENT}
`;

type LoginResponse = {
    login: AuthResponse;
};

export const useLoginMutation: MutationHook<
    LoginResponse,
    MutationLoginArgs,
    LoginInput
> = options => {
    const setHeaders = useMyApolloContext();
    const [mutation, meta] = useMutation<LoginResponse, MutationLoginArgs>(
        LOGIN,
        {
            update(cache, { data }) {
                if (data) {
                    const d = data.login;
                    const t = d.auth.token;

                    TokenUtil.setToken(t);
                    cache.writeData({
                        data: d
                    });
                    setHeaders({
                        authorization: t
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
            ...AuthFragment
        }
    }
    ${AUTH_FRAGMENT}
`;

type SignupResponse = {
    signup: AuthResponse;
};

export const useSignupMutation: MutationHook<
    SignupResponse,
    MutationSignupArgs,
    SignupInput
> = options => {
    const setHeaders = useMyApolloContext();
    const [mutation, meta] = useMutation<SignupResponse, MutationSignupArgs>(
        SIGNUP,
        {
            update(cache, { data }) {
                if (data) {
                    const d = data.signup;
                    const t = d.auth.token;

                    TokenUtil.setToken(d.auth.token);
                    cache.writeData({
                        data: d
                    });

                    setHeaders({
                        authorization: t
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
