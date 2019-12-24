import {
    useLoginMutation,
    AuthFragmentFragment,
    MeDocument,
    useSignupMutation,
} from "../generated/graphql";
import StorageUtil from "../utils/storage";
import { useMyApolloContext } from "../components/ApolloContext";

export const useILoginMutation = () => {
    const { setHeaders } = useMyApolloContext();
    return useLoginMutation({
        update(cache, { data }) {
            if (data) {
                const { user, auth } = data.login;

                new StorageUtil().setToken(auth.token);

                cache.writeQuery<{ me: AuthFragmentFragment["user"] }>({
                    query: MeDocument,
                    data: {
                        me: user,
                    },
                });

                cache.writeData<{ auth: AuthFragmentFragment["auth"] }>({
                    data: {
                        auth,
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

                new StorageUtil().setToken(auth.token);

                cache.writeQuery<{ me: AuthFragmentFragment["user"] }>({
                    query: MeDocument,
                    data: {
                        me: user,
                    },
                });

                cache.writeData<{ auth: AuthFragmentFragment["auth"] }>({
                    data: {
                        auth,
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

export const useILogout = () => {
    const { client } = useMyApolloContext();

    return function logout() {
        client?.writeQuery<{ me: null }>({
            query: MeDocument,
            data: {
                me: null,
            },
        });

        // This is not working
        // Github issue: https://github.com/apollographql/apollo-client/issues/5725
        client?.clearStore();
    };
};
