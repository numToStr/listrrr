import {
    useLoginMutation,
    AuthFragmentFragment,
    MeDocument,
    useSignupMutation,
} from "../generated/graphql";
import StorageUtil from "../utils/storage";
import { useMyApolloContext } from "../components/ApolloContext";
import { useQuery, gql } from "@apollo/client";

interface IIsLoggedIn {
    isLoggedIn: boolean;
}

interface IMe {
    me: AuthFragmentFragment["user"];
}

interface IAuth extends IIsLoggedIn {
    auth: AuthFragmentFragment["auth"];
}

export const useILoginMutation = () => {
    const { setHeaders } = useMyApolloContext();
    return useLoginMutation({
        update(cache, { data }) {
            if (data) {
                const { user, auth } = data.login;

                StorageUtil.setToken(auth.token);

                cache.writeQuery<IMe>({
                    query: MeDocument,
                    data: {
                        me: user,
                    },
                });

                cache.writeData<IAuth>({
                    data: {
                        auth,
                        isLoggedIn: true,
                    },
                });

                // This should be in the end,
                // otherwise cache will be reset without setting the user
                // and the client will refetch the user from the server
                setHeaders?.({
                    authorization: auth.token,
                });
            }
        },
    });
};

export const useISignupMutation = () => {
    const { setHeaders } = useMyApolloContext();
    return useSignupMutation({
        update(cache, { data }) {
            if (data) {
                const { user, auth } = data.signup;

                StorageUtil.setToken(auth.token);

                cache.writeQuery<IMe>({
                    query: MeDocument,
                    data: {
                        me: user,
                    },
                });

                cache.writeData<IAuth>({
                    data: {
                        auth,
                        isLoggedIn: true,
                    },
                });

                // This should be in the end,
                // otherwise cache will be reset without setting the user
                // and the client will refetch the user from the server
                setHeaders?.({
                    authorization: auth.token,
                });
            }
        },
    });
};

const IsLoggedIn = gql`
    query IsLoggedIn {
        isLoggedIn @client
    }
`;

export const useIsLoggedIn = () => {
    return useQuery<IIsLoggedIn>(IsLoggedIn);
};

export const useILogout = () => {
    const { client, setHeaders } = useMyApolloContext();

    return function logout() {
        StorageUtil.setToken("");

        // This will redirect the user to login screen
        client?.writeData<IIsLoggedIn & { me: null }>({
            data: {
                isLoggedIn: false,
                me: null,
            },
        });

        // Setting headers = {}, to make sure there is no token of previous user
        setHeaders?.({});

        // This is not working
        // Github issue: https://github.com/apollographql/apollo-client/issues/5725
        // NOW FIXED ===
        return client?.clearStore();
    };
};
