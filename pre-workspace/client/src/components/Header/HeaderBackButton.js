import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import BaseLink from "../Base/BaseRouterLink";
import IconBack from "../Icons/IconBack";

const HeaderBackButton = ({ to }) => (
    <Box mb={2}>
        <IconButton color="primary" component={BaseLink} to={to}>
            <IconBack />
        </IconButton>
    </Box>
);

export default memo(HeaderBackButton);
