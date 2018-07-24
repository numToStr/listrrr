import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
	CssBaseline,
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

import Router from "./Router";

const THEME = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
				borderRadius: "10rem"
			},
			raised: {
				boxShadow: "none"
			}
		},
		MuiAppBar: {
			root: {
				boxShadow: "none"
			}
		}
	},
	palette: {
		primary: {
			main: grey[900]
		},
		secondary: {
			main: grey[300]
		}
	},
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(",")
	}
});

const App = props => {
	return (
		<BrowserRouter>
			<MuiThemeProvider theme={THEME}>
				<CssBaseline />
				<Router />
			</MuiThemeProvider>
		</BrowserRouter>
	);
};

export default App;
