import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import formatDistance from "date-fns/formatDistance";

import IconTimeUpdated from "./Icons/IconTimeUpdated";
import IconTimeCreated from "./Icons/IconTimeCreated";

const DateFormat = ({ date, updated, ...props }) => {
    const formatDate = formatDistance(new Date(date), new Date(), {
        addSuffix: true
    });

    return (
        <Box display="flex" alignItems="center" {...props}>
            {updated ? <IconTimeUpdated /> : <IconTimeCreated />}
            <Box pl={0.5}>
                <Typography variant="caption" color="textSecondary" {...props}>
                    {updated ? "updated" : "created"} {formatDate}
                </Typography>
            </Box>
        </Box>
    );
};

export default DateFormat;
