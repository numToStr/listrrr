import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ProjectItem from "./ProjectItem";

const ProjectList = ({ items: { entities, result } }) => {
    if (!result || !result.length) {
        return <Typography>Oops! There is no Project.</Typography>;
    }

    const list = result.map(item => (
        <Grid item xs={12} key={item}>
            <ProjectItem {...entities[item]} />
        </Grid>
    ));

    return (
        <Grid container spacing={1}>
            {list}
        </Grid>
    );
};

export default ProjectList;
