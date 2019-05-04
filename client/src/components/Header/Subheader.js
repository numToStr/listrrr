import React from "react";
import { withRouter } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import OpenCloseIndicator from "../OpenCloseIndicator";
import Sort from "../Filters/Sort";

import { appendQuery } from "../../utils/url/url.utils";

const Subheader = ({ history, location: { search } }) => {
    const handleClick = q => () => {
        const encode = appendQuery(q, search);
        history.push(`?${encode}`);
    };

    const onSort = value => handleClick({ sort: value })();

    return (
        <Box mb={2}>
            <Grid container justify="space-between">
                <Grid item>
                    <OpenCloseIndicator
                        open={10}
                        closed={1}
                        onClickOpen={handleClick({ q: "is:open" })}
                        onClickClosed={handleClick({ q: "is:closed" })}
                    />
                </Grid>
                <Grid item>
                    <Sort onChange={onSort} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default withRouter(Subheader);
