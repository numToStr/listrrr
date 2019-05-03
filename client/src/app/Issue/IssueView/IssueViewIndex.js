import React, { Fragment, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";

import Loader from "../../../components/Loader/Loader";
import IssueTitle from "./IssueViewTitle";
import Surface from "../../../components/Surface";
import { issueGet, issueClear } from "../../../store/actions/index.action";

const useStyles = makeStyles(({ spacing }) => ({
    btnMargin: {
        marginLeft: spacing(1)
    },
    descMargin: {
        marginBottom: spacing(5)
    },
    commentMargin: {
        marginBottom: spacing(1.5)
    }
}));

const IssueViewIndex = ({
    match: { params },
    $issueGet,
    $issueClear,
    _currentIssue
}) => {
    const classes = useStyles();

    const $$issueGet = useCallback(() => {
        $issueGet(params.issueId);
    }, [$issueGet, params.issueId]);

    const $$issueClear = useCallback($issueClear);

    useEffect(() => {
        $$issueGet();

        // Clearing the currently loaded issue
        return $$issueClear;
    }, [$$issueGet, $$issueClear]);

    if (!_currentIssue) {
        return <Loader />;
    }

    return (
        <Fragment>
            <IssueTitle title={_currentIssue.title} />
            <Typography variant="caption" color="textSecondary">
                created @ {_currentIssue.createdAt}
            </Typography>
            <Typography variant="body2" paragraph>
                Issue is {_currentIssue.isOpen ? "Open" : "Closed"}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Surface className={classes.descMargin}>
                        <Typography variant="body1">
                            {_currentIssue.description}
                        </Typography>
                    </Surface>
                    <Grid container className={classes.commentMargin}>
                        <TextField
                            label="Comment"
                            placeholder="Leave a comment"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                        />
                    </Grid>
                    <Grid container justify="flex-end">
                        {_currentIssue.isOpen && (
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.btnMargin}
                            >
                                Close Issue
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.btnMargin}
                        >
                            Comment
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body2" gutterBottom>
                        Project
                    </Typography>
                    <Typography variant="caption">
                        {_currentIssue.project
                            ? _currentIssue.project.title
                            : "+ Add to project"}
                    </Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
};
const mapStateToProps = ({ issue }) => ({
    _currentIssue: issue.current
});

const mapDispatchToProps = {
    $issueGet: issueGet,
    $issueClear: issueClear
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueViewIndex);
