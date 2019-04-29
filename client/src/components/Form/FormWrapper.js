import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        marginTop: spacing(10)
    }
}));

const FormWrapper = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={9} sm={5} md={3}>
                {children}
            </Grid>
        </Grid>
    );
};

export default FormWrapper;
