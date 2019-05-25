import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import IconSort from "../Icons/IconSort";
import Surface from "../Surface";
import BaseLink from "../Base/BaseRouterLink";
import { appendQuery } from "../../utils/url/url.utils";

const types = [
    {
        text: "Newest",
        type: "created:desc"
    },
    {
        text: "Oldest",
        type: "created:asc"
    },
    {
        text: "Recently updated",
        type: "updated:desc"
    }
];

const Sort = ({ location: { search } }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget);
    const handleClose = () => setAnchorEl(null);

    const items = types.map(({ text, type }) => (
        <Grid key={type} item>
            <Link
                variant="body2"
                component={BaseLink}
                color="inherit"
                to={`?${appendQuery({ sort: type }, search)}`}
            >
                {text}
            </Link>
        </Grid>
    ));

    return (
        <Fragment>
            <Button size="small" onClick={handleClick}>
                <Box mr={0.5}>Sort</Box>
                <IconSort />
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <Surface>
                    <Grid container spacing={1} direction="column">
                        {items}
                    </Grid>
                </Surface>
            </Popover>
        </Fragment>
    );
};

export default withRouter(Sort);
