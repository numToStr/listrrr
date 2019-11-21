import React, { Fragment, useCallback } from "react";
import { useProjectsQuery } from "../gql/project.query";
import BaseLoader from "../components/Base/BaseLoader";
import Header from "../components/Header";
import ProjectList from "../components/Project/ProjectList";
import SortFilter from "../components/Filters/SortFilter";
import StatusFilter from "../components/Filters/StatusFilter";
import BaseFilterBox from "../components/Base/BaseFilterBox";
import { Sort, Status } from "../generated/graphql";

const Project = () => {
    const { data } = useProjectsQuery({
        filters: {
            sort: Sort.CreatedDesc,
            status: Status.Open,
        },
    });

    const renderList = useCallback(() => {
        if (!data) {
            return <BaseLoader />;
        }

        return <ProjectList projects={data.projects} />;
    }, [data]);

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
