import React, {
    createContext,
    FC,
    useState,
    useContext,
    Dispatch,
} from "react";
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import StorageUtil from "../utils/storage";
import { RequestHeaders } from "../@types/types";

const URI = [process.env.REACT_APP_BASE_URI, "/graphql"].join("");

interface ContextValue {
    setHeaders?: Dispatch<RequestHeaders>;
    client?: ApolloClient<{}>;
}

const Context = createContext<ContextValue>({});

const cache = new InMemoryCache();

export const MyApolloContext: FC = ({ children }) => {
    const t = StorageUtil.getToken() || "";

    const [headers, setHeaders] = useState<RequestHeaders>({
        authorization: t,
    });

    const client = new ApolloClient({
        link: new HttpLink({
            uri: URI,
            headers,
        }),
        cache,
        connectToDevTools: true,
    });

    return (
        <Context.Provider value={{ setHeaders, client }}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </Context.Provider>
    );
};

export const useMyApolloContext = (): ContextValue => {
    const ctx = useContext(Context);

    if (!ctx) {
        throw new Error(
            `useApolloContext() can only be used inside a <ApolloContext />`
        );
    }

    return ctx;
};
