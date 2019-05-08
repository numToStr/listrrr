import React, { memo } from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import DateFormat from "../DateFormat";
import Surface from "../Surface";
import BaseLink from "../Base/BaseRouterLink";

const ProjectItem = ({ _id, title, description, createdAt, updatedAt }) => {
    return (
        <Surface>
            <Grid container alignItems="center">
                <Grid item>
                    <Link
                        variant="h6"
                        color="textPrimary"
                        component={BaseLink}
                        to={`/d/projects/view/${_id}`}
                    >
                        {title}
                    </Link>
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
