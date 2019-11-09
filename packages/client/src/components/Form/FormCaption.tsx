import React, { memo, FC } from "react";
import { Box, Grid, Typography, Link } from "@material-ui/core";
import BaseRouterLink from "../Base/BaseRouterLink";

type Props = {
    primary: string;
    secondary: string;
    to: string;
};

const FormCaption: FC<Props> = ({ primary, secondary, to }) => {
    return (
        <Box px={1}>
            <Grid container spacing={1} justify="center">
                <Grid item>
                    <Typography variant="body2">{primary}</Typography>
                </Grid>
                <Grid item>
                    <Link
                        variant="subtitle2"
                        component={BaseRouterLink}
                        to={to}
                    >
                        {secondary}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default memo(FormCaption);
