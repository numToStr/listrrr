import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./config/theme.config";
import RouteRenderer from "./components/Routes/RouteRenderer";
import { routesConfig } from "./config/routes.config";
import BaseLoader from "./components/Base/BaseLoader";
import { MyApolloContext } from "./components/ApolloContext";

const Root = hot(module)(() => (
    <RouteRenderer routes={routesConfig} defaultRedirect="/" />
));

const App: React.FC = () => {
    return (
        <MyApolloContext>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Suspense fallback={<BaseLoader />}>
                        <Root />
                    </Suspense>
                </MuiThemeProvider>
            </BrowserRouter>
        </MyApolloContext>
    );
};

export default App;
