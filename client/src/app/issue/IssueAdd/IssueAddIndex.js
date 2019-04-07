import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import { issueAdd, projectList } from "../../../store/actions/index.action";

import Loader from "../../../components/Loader/Loader";
import IssueAddForm from "./IssueAddForm";

const initialValues = { title: "", description: "", project: "" };

const styles = ({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/issues/list" {...props} />;

const IssueAdd = ({
    classes,
    $issueAdd,
    $projectList,
    _loadingIssueAdd,
    _projectList
}) => {
    useEffect(() => {
        $projectList();
    }, []);

    const onSubmit = values => $issueAdd(values);

    if (!_projectList) {
        return <Loader />;
    }

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
            <IssueAddForm
                key="issue-add-form"
                onSubmit={onSubmit}
                initialValues={initialValues}
                loading={_loadingIssueAdd}
                options={_projectList}
            />
        </Fragment>
    );
};

const mapStateToProps = ({ http: { request }, project }) => ({
    _loadingIssueAdd: request.issueAdd,
    _projectList: project.list
});

const mapDispatchToProps = {
    $issueAdd: val => issueAdd(val),
    $projectList: () => projectList()
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(IssueAdd));
