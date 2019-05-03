import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const FormWrapper = ({ children }) => {
    return (
        <Box mt={10}>
            <Grid container justify="center">
                <Grid item xs={9} sm={5} md={3}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormWrapper;
