import React, { FC, memo } from "react";
import CreatedAtIcon from "@material-ui/icons/AccessTimeOutlined";
import { Box, Typography } from "@material-ui/core";
import { formatDate } from "../../utils/date";
import { BoxProps } from "@material-ui/core/Box";

type Props = BoxProps & {
    date: string;
};

const CreatedAt: FC<Props> = ({ date, ...props }) => {
    return (
        <Box display="flex" alignItems="center" {...props}>
            <Box clone mr={0.5}>
                <CreatedAtIcon fontSize="inherit" color="disabled" />
            </Box>
            <Typography variant="caption" color="textSecondary">
                created {formatDate(date)}
            </Typography>
        </Box>
    );
};

export default memo(CreatedAt);
