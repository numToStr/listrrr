import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BaseLink from "./Base/BaseRouterLink";

import IconTaskOpen from "./Icons/IconTaskOpen";
import IconTaskClose from "./Icons/IconTaskClose";

const OpenCloseIndicator = ({ open, closed, openLink, closeLink }) => (
    <Grid container spacing={1}>
        <Grid item>
            <Button size="small" component={BaseLink} to={openLink}>
                <IconTaskOpen />
                <Box ml={0.5}>{open} Open</Box>
            </Button>
        </Grid>
        <Grid item>
            <Button size="small" component={BaseLink} to={closeLink}>
                <IconTaskClose />
                <Box ml={0.5}>{closed} Closed</Box>
            </Button>
        </Grid>
    </Grid>
);

export default memo(OpenCloseIndicator);
