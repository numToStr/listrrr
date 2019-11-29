import { useMutation, gql } from "@apollo/client";
import {
    MutationLoginArgs,
    AuthResponse,
    MutationSignupArgs,
    User,
    AuthInfo,
} from "../generated/graphql";
import { HandleMutation, MyMutationHook } from "../@types/types";
import { TokenUtil } from "../utils/token";
import { useMyApolloContext } from "../components/ApolloContext";
import { USER_FRAGMENT, ME } from "./_user.query";

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

export const useLoginMutation: MyMutationHook<
    LoginResponse,
    MutationLoginArgs
> = options => {
    const setHeaders = useMyApolloContext();
    const [mutation, meta] = useMutation<LoginResponse, MutationLoginArgs>(
        LOGIN,
        {
            update(cache, { data }) {
                if (data) {
                    const { user, auth } = data.login;

                    TokenUtil.setToken(auth.token);

                    cache.writeQuery<User>({
                        query: ME,
                        data: user,
                    });

                    cache.writeData<{ auth: AuthInfo }>({
                        data: {
                            auth,
                        },
                    });

                    setHeaders({
                        authorization: auth.token,
                    });
                }
            },
            ...options,
        }
    );

    const handleLogin: HandleMutation<MutationLoginArgs> = variables => {
        return mutation({ variables });
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

export const useSignupMutation: MyMutationHook<
    SignupResponse,
    MutationSignupArgs
> = options => {
    const setHeaders = useMyApolloContext();
    const [mutation, meta] = useMutation<SignupResponse, MutationSignupArgs>(
        SIGNUP,
        {
            update(cache, { data }) {
                if (data) {
                    const { user, auth } = data.signup;

                    TokenUtil.setToken(auth.token);

                    cache.writeQuery<User>({
                        query: ME,
                        data: user,
                    });

                    cache.writeData<{ auth: AuthInfo }>({
                        data: {
                            auth,
                        },
                    });

                    setHeaders({
                        authorization: auth.token,
                    });
                }
            },
            ...options,
        }
    );

    const handleLogin: HandleMutation<MutationSignupArgs> = variables => {
        return mutation({ variables });
    };

    return [handleLogin, meta];
};
