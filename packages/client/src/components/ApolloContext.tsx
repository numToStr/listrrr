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

type Header = {
    authorization?: string;
};

const Context = createContext<Dispatch<Header>>(() => {});

export const MyApolloContext: FC = ({ children }) => {
    const t = new StorageUtil().getToken() || "";

    const [headers, setHeaders] = useState<Header>({
        authorization: t,
    });

    const client = new ApolloClient({
        link: new HttpLink({
            uri: "/gql",
            headers,
        }),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    });

    return (
        <Context.Provider value={setHeaders}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </Context.Provider>
    );
};

export const useMyApolloContext = (): Dispatch<Header> => {
    const ctx = useContext(Context);

    if (!ctx) {
        throw new Error(
            `useApolloContext() can only be used inside a <ApolloContext />`
        );
    }

    return ctx;
};
