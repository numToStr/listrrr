import React, { FC, memo } from "react";
import {
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    DialogContentText,
    DialogProps,
} from "@material-ui/core";
import ThemeColorList from "./ThemeColorList";
import ThemeBgColorList from "./ThemeBgColorList";

type Props = Omit<DialogProps, "children">;

const ThemeDailog: FC<Props> = props => {
    return (
        <Dialog fullWidth aria-labelledby="theme-dailog" {...props}>
            <DialogTitle id="user-setting-title" disableTypography>
                <Typography variant="h6" align="center">
                    Customize your view
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>Color</DialogContentText>
                <ThemeColorList />
                <DialogContentText>Background</DialogContentText>
                <ThemeBgColorList />
            </DialogContent>
        </Dialog>
    );
};

export default memo(ThemeDailog);
