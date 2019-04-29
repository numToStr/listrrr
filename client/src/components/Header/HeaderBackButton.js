import React, { memo, forwardRef } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";
import Box from "@material-ui/core/Box";

const HeaderBackButton = ({ to }) => {
    const _Link = forwardRef((props, ref) => (
        <Link to={to} {...props} ref={ref} />
    ));

    return (
        <Box mb={2}>
            <IconButton color="primary" component={_Link}>
                <BackIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default memo(HeaderBackButton);
