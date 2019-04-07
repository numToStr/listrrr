import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import SideDrawer from "../drawer/index.drawer";

const styles = ({ palette, spacing }) => {
    const drawerWidth = spacing.unit * 30;

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
            padding: spacing.unit * 2.5,
            paddingTop: spacing.unit * 5
        },
        content: {
            flexGrow: 1,
            width: drawerWidth
        }
    };
};

const Layout = ({ children, classes }) => {
    return (
        <Grid container className={classes.container}>
            <SideDrawer
                className={classes.drawer}
                classes={{
                    paper: `${classes.paddingAround} ${classes.drawerPaper}`
                }}
            />
            <main className={`${classes.paddingAround} ${classes.content}`}>
                {children}
            </main>
        </Grid>
    );
};

export default withStyles(styles)(Layout);
