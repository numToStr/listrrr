import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import configureStore from "../store/index.store";
import theme from "../config/theme.config";

import Root from "./Root";

const store = configureStore();

const NewRoot = hot(module)(Root);

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NewRoot />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);

export default App;
