import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";
import Box from "@material-ui/core/Box";
import BaseLink from "../Base/BaseRouterLink";

const HeaderBackButton = ({ to }) => (
    <Box mb={2}>
        <IconButton color="primary" component={BaseLink} to={to}>
            <BackIcon fontSize="small" />
        </IconButton>
    </Box>
);

export default memo(HeaderBackButton);
