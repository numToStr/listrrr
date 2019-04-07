import React from "react";
import Typography from "@material-ui/core/Typography";

import ProjectItem from "./ProjectItem";

const ProjectList = ({ items: { entities, result } }) => {
    if (!result || !result.length) {
        return <Typography>Oops! There is no Project.</Typography>;
    }

    const list = result.map(item => (
        <ProjectItem key={item} {...entities[item]} />
    ));

    return list;
};

export default ProjectList;
