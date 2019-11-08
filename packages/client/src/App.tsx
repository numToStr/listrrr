import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { Button, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./config/theme.config";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Button variant="contained" color="primary">
                        Hello
                    </Button>
                </div>
                <CssBaseline />
            </MuiThemeProvider>
        </BrowserRouter>
    );
};

export default hot(module)(App);
