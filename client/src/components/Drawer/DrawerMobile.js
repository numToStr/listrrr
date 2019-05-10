import React, { Fragment, useState, memo } from "react";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/styles/makeStyles";

import DrawerList from "./DrawerList";

const useStyles = makeStyles(({ spacing }) => ({
    menuBtn: {
        position: "fixed",
        right: 0,
        bottom: 0,
        margin: spacing(1)
    }
}));

const DrawerMobile = props => {
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
                <MenuIcon />
            </Fab>
            <Drawer
                {...props}
                open={drawerState}
                onClose={setDrawer(false)}
                variant="temporary"
                anchor="left"
            >
                <DrawerList />
            </Drawer>
        </Fragment>
    );
};

export default memo(DrawerMobile);
