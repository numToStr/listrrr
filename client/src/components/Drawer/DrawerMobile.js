import React, { Fragment, useState, memo } from "react";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import makeStyles from "@material-ui/styles/makeStyles";

import DrawerList from "./DrawerList";
import IconMenu from "../Icons/IconMenu";

const useStyles = makeStyles(({ spacing }) => {
    const unit = spacing(0.5);
    return {
        menuBtn: {
            position: "fixed",
            right: unit,
            bottom: unit,
            margin: spacing(1)
        }
    };
});

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
                <IconMenu />
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
