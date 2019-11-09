import React, { memo, FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RouterLink from "../RouterLink";
import { Box } from "@material-ui/core";

type Props = {
    primary: string;
    secondary: string;
    href: string;
};

const FormCaption: FC<Props> = ({ primary, secondary, href }) => {
    return (
        <Box px={1}>
            <Grid container spacing={1} justify="center">
                <Grid item>
                    <Typography variant="body2">{primary}</Typography>
                </Grid>
                <Grid item>
                    <RouterLink href={href} variant="subtitle2" prefetch={true}>
                        {secondary}
                    </RouterLink>
                </Grid>
            </Grid>
        </Box>
    );
};

export default memo(FormCaption);
