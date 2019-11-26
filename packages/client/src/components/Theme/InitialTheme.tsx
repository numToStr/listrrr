import React, { FC } from "react";
import {
    lighten,
    MuiThemeProvider,
    useTheme,
    Theme,
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
    const {
        palette: { getContrastText },
    } = useTheme<Theme>();

    const tPrimary = getContrastText(baseBgColor.color);

    const base = createMuiTheme({
        palette: {
            primary: baseColor.color,
            secondary: grey,
            text: {
                primary: tPrimary,
                secondary: lighten(tPrimary, 0.05),
            },
            background: {
                default: baseBgColor.color,
                paper: lighten(baseBgColor.color, 0.05),
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
