import React, { Fragment } from "react";

import Header from "../../../components/Header/Header";
import ProjectList from "./ProjectList";

const ProjectListIndex = () => {
    return (
        <Fragment>
            <Header title="Projects" addLink="/d/projects/add" />
            <ProjectList />
        </Fragment>
    );
};

export default ProjectListIndex;
