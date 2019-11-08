import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./config/theme.config";
import { RouteRenderer } from "./components/Routes/RouteRenderer";
import { routesConfig } from "./config/routes.config";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <RouteRenderer routes={routesConfig} />
                <CssBaseline />
            </MuiThemeProvider>
        </BrowserRouter>
    );
};

export default hot(module)(App);
