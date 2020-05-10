import { Dispatch } from "react";
import { useQuery, ApolloCache } from "@apollo/client";
import {
    useLoginMutation,
    AuthFragmentFragment,
    MeDocument,
    useSignupMutation,
    MeQuery,
    LoginMutation,
    SignupMutation,
} from "../generated/graphql";
import StorageUtil from "../utils/storage";
import { useMyApolloContext } from "../components/ApolloContext";
import { RequestHeaders } from "../@types/types";

type AfterAuth = <T extends LoginMutation | SignupMutation>(
    cache: ApolloCache<T>,
    payload: AuthFragmentFragment,
    setHeaders: Dispatch<RequestHeaders>
) => unknown;

const afterAuth: AfterAuth = (cache, payload, setHeaders) => {
    const { auth, user } = payload;

    StorageUtil.setToken(auth.token);

    cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
            me: user,
        },
    });

    cache.modify("ROOT_QUERY", {
        auth: () => auth,
    });

    // This should be in the end,
    // otherwise cache will be reset without setting the user
    // and the client will refetch the user from the server
    setHeaders({
        authorization: auth.token,
    });
};

export const useILoginMutation = () => {
    const { setHeaders } = useMyApolloContext();

    return useLoginMutation({
        update(cache, { data }) {
            if (!data || !setHeaders) {
                return false;
            }

            return afterAuth(cache, data.login, setHeaders);
        },
    });
};

export const useISignupMutation = () => {
    const { setHeaders } = useMyApolloContext();

    return useSignupMutation({
        update(cache, { data }) {
            if (!data || !setHeaders) {
                return false;
            }

            return afterAuth(cache, data.signup, setHeaders);
        },
    });
};

// TODO: Need to fix this
// const IsLoggedIn = gql`
//     query IsLoggedIn {
//         me @client {
//             _id
//         }
//     }
// `;

export const useIsLoggedIn = () => {
    return useQuery<MeQuery>(MeDocument);
};

export const useILogout = () => {
    const { client, setHeaders } = useMyApolloContext();

    return function logout() {
        StorageUtil.setToken("");

        // This will redirect the user to login screen
        client?.cache.modify("ROOT_QUERY", {
            me: () => null,
        });

        // Setting headers = {}, to make sure there is no token of previous user
        setHeaders?.({});

        // This will not trigger rendering, IDK if this expected behaviour or not.
        // DevTools still shows data but cache is cleared. DevTools issue https://github.com/apollographql/apollo-client/pull/5909#issuecomment-598784949
        return client?.clearStore();
    };
};
