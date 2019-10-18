import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import IssueAddForm from "./IssueAddForm";
import HeaderBackButton from "../../../components/Header/HeaderBackButton";
import { issueAdd } from "../../../store/requests/issue.request";

const IssueAdd = ({ history }) => {
    const handleSubmit = async (values, fomikBag) => {
        await issueAdd(values);

        fomikBag.setSubmitting(false);

        history.push("/d/issues");
    };

    return (
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
            <IssueAddForm onSubmit={handleSubmit} />
        </Fragment>
    );
};

export default IssueAdd;
