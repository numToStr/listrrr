import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import BaseRouterLink from "../Base/BaseRouterLink";

const FormCaption = ({ primary, secondary, to }) => {
    return (
        <Grid container spacing={1} justify="center">
            <Grid item>
                <Typography variant="subtitle2">{primary}</Typography>
            </Grid>
            <Grid item>
                <Link variant="subtitle2" component={BaseRouterLink} to={to}>
                    {secondary}
                </Link>
            </Grid>
        </Grid>
    );
};

export default memo(FormCaption);
