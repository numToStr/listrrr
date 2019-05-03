import React, { Fragment, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import IssueList from "../../../components/Issue/IssueList";
import Header from "../../../components/Header/Header";
import Loader from "../../../components/Loader/Loader";
import { issueList } from "../../../store/actions/index.action";

const IssueListIndex = ({ $issueList, _issueList }) => {
    const $$issueList = useCallback($issueList);

    useEffect(() => {
        $$issueList();
    }, [$$issueList]);

    if (!_issueList) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Header title="Issues" addLink="/d/issues/add" />
            <IssueList items={_issueList} />
        </Fragment>
    );
};

const mapStateToProps = ({ issue }) => ({
    _issueList: issue.list
});

const mapDispatchToProps = dispatchEvent => ({
    $issueList: () => dispatchEvent(issueList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueListIndex);
