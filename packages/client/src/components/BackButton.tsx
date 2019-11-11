import React, { FC } from "react";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";
import BaseRouterLink from "./Base/BaseRouterLink";
import { Box } from "@material-ui/core";

type Props = IconButtonProps & {
    to: string;
};

const BackButton: FC<Props> = ({ to }) => {
    return (
        <Box clone mb={3}>
            <IconButton component={BaseRouterLink} color="primary" to={to}>
                <BackIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default BackButton;
