import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
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
                    startIcon={<IconTaskOpen />}
                >
                    {open} Open
                </Button>
            </Grid>
            <Grid item>
                <Button
                    size="small"
                    component={BaseLink}
                    to={queryLink({ q: "is:closed" })}
                    startIcon={<IconTaskClose />}
                >
                    {closed} Closed
                </Button>
            </Grid>
        </Grid>
    );
};

export default withRouter(OpenCloseIndicator);
