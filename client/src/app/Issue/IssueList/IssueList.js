import React, { useEffect, useMemo, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import IssueItem from "../../../components/Issue/IssueItem";
import BaseLoader from "../../../components/Base/BaseLoader";

import { issueList } from "../../../store/actions/index.action";
import { parseQuery, defaultQuery } from "../../../utils/url/url.utils";
import OpenCloseIndicator from "../../../components/OpenCloseIndicator";
import Sort from "../../../components/Filters/Sort";

const IssueList = ({
    $issueList,
    _issueList,
    _issueCounts,
    location: { search }
}) => {
    const _search = search ? search : defaultQuery;
    const query = useMemo(() => {
        return parseQuery(_search);
    }, [_search]);

    useEffect(() => {
        $issueList(query);
    }, [$issueList, query]);

    if (!_issueList) {
        return <BaseLoader />;
    }

    const { entities, result } = _issueList;

    let list = (
        <Typography align="center">Oops! There are no issues.</Typography>
    );

    if (result && result.length) {
        const listGrid = result.map(item => (
            <Grid item xs={12} key={item}>
                <IssueItem {...entities[item]} />
            </Grid>
        ));

        list = (
            <Grid container spacing={1}>
                {listGrid}
            </Grid>
        );
    }

    return (
        <Fragment>
            <Box mb={2} display="flex">
                <OpenCloseIndicator
                    open={_issueCounts.open}
                    closed={_issueCounts.closed}
                />
                <Sort />
            </Box>
            {list}
        </Fragment>
    );
};

const mapStateToProps = ({ issue }) => ({
    _issueList: issue.list,
    _issueCounts: issue.counts
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
