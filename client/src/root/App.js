import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
// import muiInstall from "@material-ui/styles/install";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import configureStore from "../store/index.store";
import theme from "../config/theme.config";

import Root from "./Root";

// Installing new styles solution by @material-ui/styles
// Remove when it becomes stable
// muiInstall();

const store = configureStore();

const NewRoot = hot(module)(Root);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <NewRoot />
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
