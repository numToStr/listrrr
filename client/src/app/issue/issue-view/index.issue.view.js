import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import EditIcon from "@material-ui/icons/EditTwoTone";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import CancelIcon from "@material-ui/icons/CancelTwoTone";

import { issueGet } from "../../../store/actions/index.action";

const IssueViewIndex = ({ match: { params }, $issueGet, _currentIssue }) => {
    const [editField, setEditField] = useState(false);

    useEffect(() => {
        $issueGet(params.issueId);
    }, []);

    const title = !editField ? (
        <Fragment>
            <Grid item>
                <Typography variant="h5" style={{ padding: ".75rem 0" }}>
                    {_currentIssue.title}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={() => setEditField(true)}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Grid>
        </Fragment>
    ) : (
        <Fragment>
            <Grid item>
                <TextField
                    name="title"
                    label="Issue Title"
                    value={_currentIssue.title}
                    variant="outlined"
                />
            </Grid>
            <Grid item>
                <IconButton>
                    <SaveIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => setEditField(false)}>
                    <CancelIcon fontSize="small" />
                </IconButton>
            </Grid>
        </Fragment>
    );

    return (
        <Fragment>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                style={{ marginBottom: "1rem" }}
            >
                {title}
            </Grid>
            <Typography variant="caption" color="textSecondary" paragraph>
                created @ {_currentIssue.createdAt}
            </Typography>
            <Typography variant="body2">
                Issue is {_currentIssue.completed ? "Closed" : "Open"}
            </Typography>
            <Typography variant="body2">{_currentIssue.description}</Typography>
        </Fragment>
    );
};
const mapStateToProps = ({ issue }) => ({
    _currentIssue: issue.current ? issue.current : {}
});

const mapDispatchToProps = dispatchEvent => ({
    $issueGet: id => dispatchEvent(issueGet(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueViewIndex);
