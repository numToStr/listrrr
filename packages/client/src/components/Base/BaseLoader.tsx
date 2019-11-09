import React from "react";
import {
    Typography,
    LinearProgress,
    Grid,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
    page: {
        height: "100%",
        paddingBottom: spacing(11)
    }
}));

export const BaseLoader = () => {
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
