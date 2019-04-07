import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

const styles = ({ spacing }) => ({
    page: {
        height: "100%",
        paddingBottom: spacing.unit * 11
    }
});

const LoaderPage = ({ classes }) => {
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

export default withStyles(styles)(LoaderPage);
