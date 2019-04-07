import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ProjectCard from "./ProjectCard";

const ProjectCardList = ({ columns: { entities, result }, issues }) => {
    if (!result || !result.length) {
        return <Typography>Oops! There is no column.</Typography>;
    }

    const list = result.map(item => (
        <ProjectCard key={item} {...entities[item]} issue={issues[item]} />
    ));

    return (
        <Grid container justify="space-between" spacing={16}>
            {list}
        </Grid>
    );
};

export default ProjectCardList;
