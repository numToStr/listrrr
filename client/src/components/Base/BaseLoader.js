import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(({ spacing }) => ({
    page: {
        height: "100%",
        paddingBottom: spacing(11)
    }
}));

const BaseLoader = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.page}
        >
            <Grid item xs={3} lg={2}>
                <Typography align="center" color="textSecondary" paragraph>
                    Loading...
                </Typography>
                <LinearProgress />
            </Grid>
        </Grid>
    );
};

export default BaseLoader;
