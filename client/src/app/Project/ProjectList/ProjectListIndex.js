import React, { Fragment } from "react";

import Header from "../../../components/Header/Header";
import ProjectList from "./ProjectList";
import Subheader from "../../../components/Header/Subheader";

const ProjectListIndex = () => {
    return (
        <Fragment>
            <Header title="Projects" addLink="/d/projects/add" />
            <Subheader />
            <ProjectList />
        </Fragment>
    );
};

export default ProjectListIndex;
