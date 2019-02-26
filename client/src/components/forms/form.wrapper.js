import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ({ spacing }) => ({
    root: {
        marginTop: spacing.unit * 10
    }
});

const FormWrapper = ({ classes, children }) => {
    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={9} sm={5} md={3}>
                {children}
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(FormWrapper);
