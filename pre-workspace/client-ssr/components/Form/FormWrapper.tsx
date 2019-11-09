import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const FormWrapper: FC = ({ children }) => {
    return (
        <Box mt={10} mb={2}>
            <Grid container justify="center">
                <Grid item xs={9} sm={5} md={3}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormWrapper;
