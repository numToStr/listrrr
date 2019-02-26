import React from "react";
import Grid from "@material-ui/core/Grid";

const FormWrapper = ({ children }) => {
    return (
        <Grid container justify="center">
            <Grid item xs={9} sm={5} md={3}>
                {children}
            </Grid>
        </Grid>
    );
};

export default FormWrapper;
