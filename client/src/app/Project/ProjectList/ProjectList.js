import React, { useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import BaseLoader from "../../../components/Base/BaseLoader";
import ProjectItem from "../../../components/Project/ProjectItem";

import { projectList } from "../../../store/actions/index.action";
import { parseQuery, defaultQuery } from "../../../utils/url/url.utils";

const ProjectList = ({ $projectList, _projectList, location: { search } }) => {
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
        <Grid container spacing={1}>
            {list}
        </Grid>
    );
};

const mapStateToProps = ({ project }) => ({
    _projectList: project.list
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
