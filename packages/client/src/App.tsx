import React from "react";
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

const client = new ApolloClient({
    link: new HttpLink({
        uri: "/"
    }),
    cache: new InMemoryCache()
});

const Root = hot(module)(() => <RouteRenderer routes={routesConfig} />);

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <Root />
                    <CssBaseline />
                </MuiThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
