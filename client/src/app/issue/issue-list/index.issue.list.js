import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import IssueList from "../../../components/issue/issue.list";
import Header from "../../../components/header/header";
import Loader from "../../../components/Loader/Loader";
import { issueList } from "../../../store/actions/index.action";

const IssueListIndex = ({ $issueList, _issueList }) => {
    useEffect(() => {
        $issueList();
    }, []);

    if (!_issueList) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Header title="Issues" addLink="/d/issues/add" />
            <Grid container>
                <Grid item xs={12}>
                    <IssueList items={_issueList} />
                </Grid>
            </Grid>
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
