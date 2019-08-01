import React, { useEffect, useMemo, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import BaseLoader from "../../../components/Base/BaseLoader";
import ProjectItem from "../../../components/Project/ProjectItem";
import OpenCloseIndicator from "../../../components/OpenCloseIndicator";
import Sort from "../../../components/Filters/Sort";

import { projectList } from "../../../store/actions/index.action";
import { parseQuery, defaultQuery } from "../../../utils/url/url.utils";

const ProjectList = ({
    $projectList,
    _projectList,
    _projectCounts,
    location: { search }
}) => {
    const _search = search ? search : defaultQuery;
    const query = useMemo(() => {
        return parseQuery(_search);
    }, [_search]);

    useEffect(() => {
        $projectList(query);
    }, [$projectList, query]);

    if (!_projectList) {
        return <BaseLoader />;
    }

    const { result, entities } = _projectList;

    if (!result || !result.length) {
        return <Typography>Oops! There is no Project.</Typography>;
    }

    const list = result.map(item => (
        <Grid item xs={12} key={item}>
            <ProjectItem {...entities[item]} />
        </Grid>
    ));

    return (
        <Fragment>
            <Box mb={2} display="flex">
                <OpenCloseIndicator
                    open={_projectCounts.open}
                    closed={_projectCounts.closed}
                />
                <Sort />
            </Box>
            <Grid container spacing={1}>
                {list}
            </Grid>
        </Fragment>
    );
};

const mapStateToProps = ({ project }) => ({
    _projectList: project.list,
    _projectCounts: project.counts
});

const mapDispatchToProps = {
    $projectList: projectList
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectList)
);
