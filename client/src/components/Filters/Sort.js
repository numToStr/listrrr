import React, { Fragment, useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import SortIcon from "@material-ui/icons/SortTwoTone";
import Link from "@material-ui/core/Link";

import Surface from "../Surface";
import { Grid } from "@material-ui/core";

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

const Sort = ({ onChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleChange = type => () => onChange(type);

    const items = types.map(({ text, type }) => (
        <Grid key={type} item>
            <Link
                style={{ cursor: "pointer" }}
                variant="body2"
                component="span"
                color="inherit"
                onClick={handleChange(type)}
            >
                {text}
            </Link>
        </Grid>
    ));

    return (
        <Fragment>
            <Button size="small" onClick={handleClick}>
                <Box mr={0.5}>Sort</Box>
                <SortIcon fontSize="small" />
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

export default Sort;
