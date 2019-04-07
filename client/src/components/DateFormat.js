import React from "react";
import Typography from "@material-ui/core/Typography";
import formatDistance from "date-fns/formatDistance";

const DateFormat = ({ date, prefix = "created", ...props }) => {
    const formatDate = formatDistance(new Date(date), new Date(), {
        addSuffix: true
    });

    return (
        <Typography variant="caption" color="textSecondary" {...props}>
            {prefix} {formatDate}
        </Typography>
    );
};

export default DateFormat;
