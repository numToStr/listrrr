import {
    useLoginMutation,
    AuthFragmentFragment,
    MeDocument,
    useSignupMutation,
} from "../generated/graphql";
import StorageUtil from "../utils/storage";
import { useMyApolloContext } from "../components/ApolloContext";

export const useILoginMutation = () => {
    const setHeaders = useMyApolloContext();
    return useLoginMutation({
        update(cache, { data }) {
            if (data) {
                const { user, auth } = data.login;

                new StorageUtil().setToken(auth.token);

                setHeaders({
                    authorization: auth.token,
                });

                cache.writeQuery<AuthFragmentFragment["user"]>({
                    query: MeDocument,
                    data: user,
                });

                cache.writeData<{ auth: AuthFragmentFragment["auth"] }>({
                    data: {
                        auth,
                    },
                });
            }
        },
    });
};

export const useISignupMutation = () => {
    const setHeaders = useMyApolloContext();
    return useSignupMutation({
        update(cache, { data }) {
            if (data) {
                const { user, auth } = data.signup;

                new StorageUtil().setToken(auth.token);

                setHeaders({
                    authorization: auth.token,
                });

                cache.writeQuery<AuthFragmentFragment["user"]>({
                    query: MeDocument,
                    data: user,
                });

                cache.writeData<{ auth: AuthFragmentFragment["auth"] }>({
                    data: {
                        auth,
                    },
                });
            }
        },
    });
};
