import React, { Fragment } from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import IssueEditForm from "./issue.edit.form";

const initialValues = { title: "", description: "" };

const styles = ({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/issues/list" {...props} />;

const IssueEdit = ({ classes, match: { params } }) => {
    const onSubmit = values => console.log(values);

    console.log(params);

    return (
        <Fragment>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <IconButton
                        color="primary"
                        component={_Link}
                        className={classes.headerMargin}
                    >
                        <BackIcon fontSize="small" />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Edit Issue
                    </Typography>
                </Grid>
            </Grid>
            <IssueEditForm onSubmit={onSubmit} initialValues={initialValues} />
        </Fragment>
    );
};

export default withStyles(styles)(IssueEdit);
