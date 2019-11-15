import React, { memo } from "react";
import { Drawer, Box, makeStyles } from "@material-ui/core";
import DrawerList, { DrawerType } from "./DrawerList";

const useStyles = makeStyles(({ palette: { primary }, spacing }) => {
    const drawerWidth = spacing(30);
    return {
        drawerRoot: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerBg: {
            background: primary.main,
            color: primary.contrastText,
            width: drawerWidth
        }
    };
});

const DrawerDesktop = () => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            classes={{
                root: classes.drawerRoot,
                paper: classes.drawerBg
            }}
        >
            <Box p={3} pt={5}>
                <DrawerList type={DrawerType.DESKTOP} />
            </Box>
        </Drawer>
    );
};

export default memo(DrawerDesktop);
