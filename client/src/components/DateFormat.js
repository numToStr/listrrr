import React from "react";
import Typography from "@material-ui/core/Typography";
import TimeLineIcon from "@material-ui/icons/TimelineTwoTone";
import TimeIcon from "@material-ui/icons/AccessTimeOutlined";
import Box from "@material-ui/core/Box";
import formatDistance from "date-fns/formatDistance";

const DateFormat = ({ date, updated, ...props }) => {
    const formatDate = formatDistance(new Date(date), new Date(), {
        addSuffix: true
    });

    return (
        <Box display="flex" alignItems="center" {...props}>
            {updated ? (
                <TimeLineIcon fontSize="inherit" color="disabled" />
            ) : (
                <TimeIcon fontSize="inherit" color="disabled" />
            )}
            <Box pl={0.5}>
                <Typography variant="caption" color="textSecondary" {...props}>
                    {updated ? "updated" : "created"} {formatDate}
                </Typography>
            </Box>
        </Box>
    );
};

export default DateFormat;
