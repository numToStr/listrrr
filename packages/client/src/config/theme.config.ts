import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { red, grey } from "@material-ui/core/colors";

const base = createMuiTheme({
    palette: {
        primary: red,
        secondary: grey,
        background: {
            default: "#fff",
        },
    },
    typography: {
        fontFamily: [
            "Fira Code",
            "monospace",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

export const theme = responsiveFontSizes(base);
