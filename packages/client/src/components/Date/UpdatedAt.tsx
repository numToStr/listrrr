import React, { FC, memo } from "react";
import UpdatedAtIcon from "@material-ui/icons/TimelineTwoTone";
import { Box, Typography } from "@material-ui/core";
import { formatDate } from "../../utils/date";

type Props = {
    date: string;
};

const UpdatedAt: FC<Props> = ({ date }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box clone mr={0.5}>
                <UpdatedAtIcon fontSize="inherit" color="disabled" />
            </Box>
            <Typography variant="caption" color="textSecondary">
                updated {formatDate(date)}
            </Typography>
        </Box>
    );
};

export default memo(UpdatedAt);
