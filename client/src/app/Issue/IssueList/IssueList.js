import React, { useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import IssueItem from "../../../components/Issue/IssueItem";
import Loader from "../../../components/Loader/Loader";

import { issueList } from "../../../store/actions/index.action";
import { parseQuery } from "../../../utils/url/url.utils";

const IssueList = ({ $issueList, _issueList, location: { search } }) => {
    const _search = search ? search : "?q=is%3Aopen";
    const query = useMemo(() => {
        return parseQuery(_search);
    }, [_search]);

    useEffect(() => {
        $issueList(query);
    }, [$issueList, query]);

    if (!_issueList) {
        return <Loader />;
    }

    const { entities, result } = _issueList;

    if (!result || !result.length) {
        return <Typography>Oops! There is no Issues.</Typography>;
    }

    const list = result.map(item => (
        <Grid item xs={12} key={item}>
            <IssueItem {...entities[item]} />
        </Grid>
    ));

    return (
        <Grid container spacing={1}>
            {list}
        </Grid>
    );
};

const mapStateToProps = ({ issue }) => ({
    _issueList: issue.list
});

const mapDispatchToProps = {
    $issueList: issueList
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(IssueList)
);
