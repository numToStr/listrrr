import React, { Fragment } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import IssueAddForm from "./issue.add.form";
import { issueAdd } from "../../../store/actions/issue.action";

const initialValues = { title: "", description: "" };

const styles = ({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/issues/list" {...props} />;

const IssueAdd = ({ classes, $issueAdd }) => {
    const onSubmit = values => $issueAdd(values);

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
                        New Issue
                    </Typography>
                </Grid>
            </Grid>
            <IssueAddForm onSubmit={onSubmit} initialValues={initialValues} />
        </Fragment>
    );
};

const mapDispatchToProps = dispatchEvent => ({
    $issueAdd: val => dispatchEvent(issueAdd(val))
});

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(IssueAdd));
