import React, { FC } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import ProjectItem from "./ProjectItem";
import { ProjectsQuery } from "../../generated/graphql";

type Props = ProjectsQuery & BoxProps;

const ProjectList: FC<Props> = ({ projects, ...props }) => {
    const list = projects.map(p => {
        return p && <ProjectItem key={p._id} project={p} />;
    });

    return (
        <Box mb={5} {...props}>
            {list}
        </Box>
    );
};

export default ProjectList;
