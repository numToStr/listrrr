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
import { TokenUtil } from "../utils/token";

type Header = {
    authorization?: string;
};

const Context = createContext<Dispatch<Header>>(() => {});

export const MyApolloContext: FC = ({ children }) => {
    const [headers, setHeaders] = useState<Header>({
        authorization: TokenUtil.getToken()!,
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
