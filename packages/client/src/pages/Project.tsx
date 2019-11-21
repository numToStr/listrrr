import React, { Fragment, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useProjectsLazyQuery } from "../gql/project.query";
import BaseLoader from "../components/Base/BaseLoader";
import Header from "../components/Header";
import ProjectList from "../components/Project/ProjectList";
import SortFilter from "../components/Filters/SortFilter";
import StatusFilter from "../components/Filters/StatusFilter";
import BaseFilterBox from "../components/Base/BaseFilterBox";
import { useParseSearch } from "../utils/hooks/useSearch";

const Project = () => {
    const { search } = useLocation();
    const filters = useParseSearch(search);
    const [getProjects, { data, loading }] = useProjectsLazyQuery();

    useEffect(() => {
        getProjects({
            variables: { filters },
        });
    }, [filters, getProjects]);

    const renderList = useCallback(() => {
        if (loading) {
            return <BaseLoader />;
        }

        if (!data || !data.projects.length) {
            return <Typography>No projects found...</Typography>;
        }

        return <ProjectList projects={data.projects} />;
    }, [data, loading]);

    return (
        <Fragment>
            <Header title="Projects" goToCreate="/d/project/create" />
            <BaseFilterBox>
                <StatusFilter />
                <SortFilter />
            </BaseFilterBox>
            {renderList()}
        </Fragment>
    );
};

export default Project;
