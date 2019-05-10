import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";

import DrawerIndex from "../Drawer/DrawerIndex";

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
                        {children}
                    </main>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Layout;
