import React from "react";
import Grid from "@material-ui/core/Grid";

import ProjectCard from "./ProjectCard";

const ProjectCardList = ({ items }) => {
    const list = Object.values(items).map(item => (
        <ProjectCard key={item._id} {...item} />
    ));

    return (
        <Grid container justify="space-between" spacing={8}>
            {list}
        </Grid>
    );
};

export default ProjectCardList;
