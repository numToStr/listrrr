import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BaseLink from "./Base/BaseRouterLink";

import IconTaskOpen from "./Icons/IconTaskOpen";
import IconTaskClose from "./Icons/IconTaskClose";
import { appendQuery } from "../utils/url/url.utils";

const OpenCloseIndicator = ({ open, closed, location: { search } }) => {
    const queryLink = useCallback(q => `?${appendQuery(q, search)}`, [search]);

    return (
        <Grid container spacing={1}>
            <Grid item>
                <Button
                    size="small"
                    component={BaseLink}
                    to={queryLink({ q: "is:open" })}
                >
                    <IconTaskOpen />
                    <Box ml={0.5}>{open} Open</Box>
                </Button>
            </Grid>
            <Grid item>
                <Button
                    size="small"
                    component={BaseLink}
                    to={queryLink({ q: "is:closed" })}
                >
                    <IconTaskClose />
                    <Box ml={0.5}>{closed} Closed</Box>
                </Button>
            </Grid>
        </Grid>
    );
};

export default withRouter(OpenCloseIndicator);
