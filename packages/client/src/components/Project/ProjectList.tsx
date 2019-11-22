import React, { FC } from "react";
import { Box } from "@material-ui/core";
import ProjectItem from "./ProjectItem";
import { ProjectsQuery } from "../../gql/project.query";

type Props = ProjectsQuery;

const ProjectList: FC<Props> = ({ projects }) => {
    const list = projects.map(project => {
        return <ProjectItem key={project._id} project={project} />;
    });

    return <Box mb={5}>{list}</Box>;
};

export default ProjectList;
