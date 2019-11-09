import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import {
    ApolloProvider,
    ApolloClient,
    HttpLink,
    InMemoryCache
} from "@apollo/client";
import { theme } from "./config/theme.config";
import { RouteRenderer } from "./components/Routes/RouteRenderer";
import { routesConfig } from "./config/routes.config";
import { BaseLoader } from "./components/Base/BaseLoader";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "/"
    }),
    cache: new InMemoryCache(),
    connectToDevTools: true
});

const Root = hot(module)(() => <RouteRenderer routes={routesConfig} />);

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Suspense fallback={<BaseLoader />}>
                        <Root />
                    </Suspense>
                </MuiThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
