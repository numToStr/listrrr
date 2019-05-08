import React from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import OpenCloseIndicator from "../OpenCloseIndicator";
import Sort from "../Filters/Sort";

import { appendQuery } from "../../utils/url/url.utils";

const Subheader = ({ location: { search } }) => {
    const query = q => `?${appendQuery(q, search)}`;

    return (
        <Box mb={2}>
            <Grid container justify="space-between">
                <Grid item>
                    <OpenCloseIndicator
                        open={10}
                        closed={1}
                        openLink={query({ q: "is:open" })}
                        closeLink={query({ q: "is:closed" })}
                    />
                </Grid>
                <Grid item>
                    <Sort />
                </Grid>
            </Grid>
        </Box>
    );
};

export default withRouter(Subheader);
