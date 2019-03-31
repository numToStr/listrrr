import React, { memo } from "react";
import Link from "react-router-dom/Link";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import DateFormat from "../DateFormat";
import ListCard from "../ListCard";

const ProjectItem = ({ _id, title, description, createdAt, updatedAt }) => {
    return (
        <ListCard>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h6" color="textPrimary">
                        <Link to={`/d/project/view/${_id}`}>{title}</Link>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="space-between">
                <DateFormat date={createdAt} />
                <DateFormat date={updatedAt} prefix="updated" />
            </Grid>
        </ListCard>
    );
};

export default memo(ProjectItem);
