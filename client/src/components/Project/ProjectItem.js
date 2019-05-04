import React, { memo, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import DateFormat from "../DateFormat";
import Surface from "../Surface";

const ProjectItem = ({ _id, title, description, createdAt, updatedAt }) => {
    const AdapterLink = forwardRef((props, ref) => (
        <RouterLink innerRef={ref} {...props} />
    ));

    return (
        <Surface>
            <Grid container alignItems="center">
                <Grid item>
                    <Link
                        variant="h6"
                        color="textPrimary"
                        component={AdapterLink}
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
