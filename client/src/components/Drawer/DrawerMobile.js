import React, { Fragment, useState, memo } from "react";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import makeStyles from "@material-ui/styles/makeStyles";

import DrawerList from "./DrawerList";
import IconMenu from "../Icons/IconMenu";

const useStyles = makeStyles(({ palette: { primary }, spacing }) => {
    const unit = spacing(1.5);
    return {
        drawerBg: {
            background: primary.main,
            color: primary.contrastText,
            borderRadius: spacing(2, 2),
            height: spacing(50)
        },
        menuBtn: {
            position: "fixed",
            right: unit,
            bottom: unit
        }
    };
});

const DrawerMobile = () => {
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState(false);
    const setDrawer = bool => () => setDrawerState(bool);

    return (
        <Fragment>
            <Fab
                size="small"
                color="primary"
                onClick={setDrawer(true)}
                className={classes.menuBtn}
            >
                <IconMenu />
            </Fab>
            <Drawer
                open={drawerState}
                onClose={setDrawer(false)}
                variant="temporary"
                anchor="bottom"
                classes={{
                    paper: classes.drawerBg
                }}
            >
                <Box p={3}>
                    <DrawerList type="mobile" onTap={setDrawer(false)} />
                </Box>
            </Drawer>
        </Fragment>
    );
};

export default memo(DrawerMobile);
