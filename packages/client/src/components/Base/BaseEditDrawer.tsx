import React, { FC } from "react";
import { Box, Drawer, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
    editDrawer: {
        width: spacing(40),
        [breakpoints.up("sm")]: {
            width: spacing(50)
        },
        [breakpoints.up("md")]: {
            width: spacing(60)
        }
    }
}));

type Props = {
    open: boolean;
    onClose(): void;
};

const BaseEditDrawer: FC<Props> = ({ children, open, onClose }) => {
    const classes = useStyles();
    return (
        <Drawer
            classes={{
                paper: classes.editDrawer
            }}
            open={open}
            onClose={onClose}
            variant="temporary"
            anchor="right"
        >
            <Box p={3}>{children}</Box>
        </Drawer>
    );
};

export default BaseEditDrawer;
