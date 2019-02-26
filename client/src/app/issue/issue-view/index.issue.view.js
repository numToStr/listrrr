import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import Loader from "../../../components/loader/loader.page";
import IssueTitle from "./issue-view.title";
import IssueDescription from "./issue-view.description";
import { issueGet } from "../../../store/actions/index.action";

const IssueViewIndex = ({ match: { params }, $issueGet, _currentIssue }) => {
    useEffect(() => {
        $issueGet(params.issueId);
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

const mapDispatchToProps = dispatchEvent => ({
    $issueGet: id => dispatchEvent(issueGet(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueViewIndex);
