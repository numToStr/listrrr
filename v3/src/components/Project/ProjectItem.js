import React, { memo } from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import DateFormat from "../DateFormat";
import Surface from "../Surface";

const ProjectItem = ({ _id, title, description, createdAt, updatedAt }) => {
    return (
        <Surface>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h6" color="textPrimary">
                        <Link
                            style={{ textDecoration: "none" }}
                            to={`/d/projects/view/${_id}`}
                        >
                            {title}
                        </Link>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="space-between">
                <DateFormat date={updatedAt} prefix="updated" />
                <DateFormat date={createdAt} />
            </Grid>
        </Surface>
    );
};

export default memo(ProjectItem);
