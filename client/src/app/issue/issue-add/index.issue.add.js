import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

const IssueAdd = ({ history: { goBack } }) => {
    return (
        <Fragment>
            <Grid container justify="space-between">
                <Grid item>
                    <IconButton color="primary" onClick={goBack}>
                        <BackIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h5">Add Issue</Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default IssueAdd;
