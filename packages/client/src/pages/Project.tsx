import React, { Fragment, useCallback } from "react";
import { useProjectsQuery } from "../gql/project.query";
import BaseLoader from "../components/Base/BaseLoader";
import Header from "../components/Header";
import ProjectList from "../components/Project/ProjectList";

const Project = () => {
    const { data } = useProjectsQuery();

    const renderList = useCallback(() => {
        if (!data) {
            return <BaseLoader />;
        }

        return <ProjectList projects={data.projects} />;
    }, [data]);

    return (
        <Fragment>
            <Header title="Projects" goToCreate="/d/project/create" />
            {renderList()}
        </Fragment>
    );
};

export default Project;
