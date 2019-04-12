import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import Loader from "../../../components/Loader/Loader";
import IssueTitle from "./IssueViewTitle";
import IssueDescription from "./IssueViewDescription";
import { issueGet, issueClear } from "../../../store/actions/index.action";

const IssueViewIndex = ({
    match: { params },
    $issueGet,
    $issueClear,
    _currentIssue
}) => {
    useEffect(() => {
        $issueGet(params.issueId);

        // Clearing the currently loaded issue
        return $issueClear;
    }, []);

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
            <IssueDescription description={_currentIssue.description} />
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
