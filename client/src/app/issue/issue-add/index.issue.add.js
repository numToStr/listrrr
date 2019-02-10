import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import IssueAddForm from "./issue.add.form";

const initialValues = { title: "", description: "" };

const IssueAdd = ({ history: { goBack } }) => {
    const onSubmit = values => console.log(values);

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
            <IssueAddForm onSubmit={onSubmit} initialValues={initialValues} />
        </Fragment>
    );
};

export default IssueAdd;
