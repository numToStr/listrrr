import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import IssueAddForm from "./IssueAddForm";
import HeaderBackButton from "../../../components/Header/HeaderBackButton";

const IssueAdd = () => (
    <Fragment>
        <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12}>
                <HeaderBackButton to="/d/issues/list" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    New Issue
                </Typography>
            </Grid>
        </Grid>
        <IssueAddForm />
    </Fragment>
);

export default IssueAdd;
