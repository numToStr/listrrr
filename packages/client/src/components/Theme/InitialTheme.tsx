import React, { FC } from "react";
import {
    MuiThemeProvider,
    responsiveFontSizes,
    createMuiTheme,
} from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { AppTheme } from "../../@types/types";

export const InitialTheme: FC<AppTheme> = ({
    baseColor,
    baseBgColor,
    children,
}) => {
    const base = createMuiTheme({
        palette: {
            type: baseBgColor.type,
            primary: baseColor.color,
            secondary: grey,
            background: {
                default: baseBgColor.color,
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

    const t = responsiveFontSizes(base);

    return <MuiThemeProvider theme={t}>{children}</MuiThemeProvider>;
};
