import React, { Fragment, useState, memo } from "react";
import { Box, Drawer, Fab, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { DrawerList, DrawerType } from "./DrawerList";

const useStyles = makeStyles(({ palette: { primary }, spacing }) => {
    const unit = spacing(1.5);
    return {
        drawerBg: {
            background: primary.main,
            color: primary.contrastText,
            borderTopLeftRadius: unit,
            borderTopRightRadius: unit,
            height: spacing(45)
        }
    };
});

const DrawerMobile = () => {
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState<boolean>(false);
    const setDrawer = (bool: boolean) => () => setDrawerState(bool);

    return (
        <Fragment>
            <Box clone zIndex="modal" position="fixed" right={15} bottom={15}>
                <Fab size="medium" color="primary" onClick={setDrawer(true)}>
                    <MenuIcon />
                </Fab>
            </Box>
            <Drawer
                open={drawerState}
                onClose={setDrawer(false)}
                variant="temporary"
                anchor="bottom"
                classes={{
                    paper: classes.drawerBg
                }}
            >
                <Box p={4}>
                    <DrawerList
                        type={DrawerType.MOBILE}
                        onTap={setDrawer(false)}
                    />
                </Box>
            </Drawer>
        </Fragment>
    );
};

export default memo(DrawerMobile);
