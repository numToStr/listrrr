import React, { Fragment, Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";

import DrawerIndex from "../Drawer/DrawerIndex";
import Loader from "../Loader/Loader";

const useStyles = makeStyles(({ palette, spacing }) => {
    const drawerWidth = spacing(30);

    return {
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            background: palette.primary.main,
            color: palette.primary.contrastText,
            width: drawerWidth
        },
        container: {
            display: "flex",
            flexWrap: "wrap",
            height: "100%"
        },
        paddingAround: {
            padding: spacing(2.5),
            paddingTop: spacing(5)
        },
        content: {
            flexGrow: 1
        }
    };
});

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid container className={classes.container}>
                <Grid item>
                    <DrawerIndex
                        className={classes.drawer}
                        classes={{
                            paper: `${classes.paddingAround} ${
                                classes.drawerPaper
                            }`
                        }}
                    />
                </Grid>
                {/* Don't remove the xs prop, otherwise will break the layout */}
                <Grid item xs>
                    <main
                        className={`${classes.paddingAround} ${
                            classes.content
                        }`}
                    >
                        <Suspense fallback={<Loader />}>{children}</Suspense>
                    </main>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Layout;
