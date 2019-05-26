import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Link from "@material-ui/core/Link";

import IconSort from "../Icons/IconSort";
import Surface from "../Surface";
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

const Sort = ({ location: { search }, history }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget);
    const handleClose = () => setAnchorEl(null);

    const goTo = type => () => {
        return history.push(`?${appendQuery({ sort: type }, search)}`);
    };

    const items = types.map(({ text, type }) => (
        <Box key={type} py={0.5}>
            <Link color="inherit" variant="body2" onClick={goTo(type)}>
                {text}
            </Link>
        </Box>
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
                <Surface>{items}</Surface>
            </Popover>
        </Fragment>
    );
};

export default withRouter(Sort);
