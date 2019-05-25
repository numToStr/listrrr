import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/styles/makeStyles";

import DrawerIndex from "../Drawer/DrawerIndex";
import Loader from "../Loader/Loader";

const useStyles = makeStyles({
    container: {
        height: "100%"
    }
});

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item>
                <DrawerIndex />
            </Grid>
            {/* Don't remove the xs prop, otherwise will break the layout */}
            <Grid item xs>
                <Box p={3} pt={5} flexGrow={1} component="main">
                    <Suspense fallback={<Loader />}>{children}</Suspense>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Layout;
