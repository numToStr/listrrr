import React, { Fragment, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import BaseLoader from "../../../components/Base/BaseLoader";
import BaseBlockQuote from "../../../components/Base/BaseBlockQuote";
import HeaderBackButton from "../../../components/Header/HeaderBackButton";
import {
    issueGet,
    issueClear,
    issueUpdateSuccess
} from "../../../store/actions/index.action";
import IssueCommentForm from "./IssueCommentForm";
import IssueEditIndex from "../IssueEdit/IssueEditIndex";
import { issueUpdate } from "../../../store/requests/issue.request";

const IssueViewIndex = ({
    match: { params },
    $issueGet,
    $issueClear,
    $issueUpdateSuccess,
    _currentIssue
}) => {
    const $$issueGet = useCallback(() => {
        $issueGet(params.issueId);
    }, [$issueGet, params.issueId]);

    const $$issueClear = useCallback($issueClear);

    const issueClose = async () => {
        const data = await issueUpdate(params.issueId, {
            isOpen: !_currentIssue.isOpen
        });

        $issueUpdateSuccess(data);
    };

    const onComment = val => console.log(val);

    useEffect(() => {
        $$issueGet();

        // Clearing the currently loaded issue
        return $$issueClear;
    }, [$$issueGet, $$issueClear]);

    if (!_currentIssue) {
        return <BaseLoader />;
    }

    return (
        <Fragment>
            <HeaderBackButton to="/d/issues/list" />
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs>
                    <Typography variant="h6" gutterBottom>
                        {_currentIssue.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <IssueEditIndex issue={_currentIssue} />
                </Grid>
            </Grid>
            <Typography variant="caption" color="textSecondary">
                created @ {_currentIssue.createdAt}
            </Typography>
            <Typography variant="body2" paragraph>
                Issue is {_currentIssue.isOpen ? "Open" : "Closed"}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                    <Box mb={5}>
                        <BaseBlockQuote>
                            <Typography variant="body1">
                                {_currentIssue.description}
                            </Typography>
                        </BaseBlockQuote>
                    </Box>
                    <IssueCommentForm
                        onSubmit={onComment}
                        onClose={issueClose}
                        isOpen={_currentIssue.isOpen}
                    />
                </Grid>
                <Hidden xsDown>
                    <Grid item xs>
                        <Typography variant="body2" gutterBottom>
                            Project
                        </Typography>
                        <Typography variant="caption">
                            {_currentIssue.project
                                ? _currentIssue.project.title
                                : "+ Add to project"}
                        </Typography>
                    </Grid>
                </Hidden>
            </Grid>
        </Fragment>
    );
};
const mapStateToProps = ({ issue }) => ({
    _currentIssue: issue.current
});

const mapDispatchToProps = {
    $issueGet: issueGet,
    $issueClear: issueClear,
    $issueUpdateSuccess: issueUpdateSuccess
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueViewIndex);
