import React, { memo } from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import ListCard from "../ListCard";
import DateFormat from "../DateFormat";

const IssueItem = ({ _id, title, createdAt, titleProps }) => {
    const link = `/d/issues/view/${_id}`;

    return (
        <ListCard>
            <Typography variant="h6" {...titleProps} gutterBottom>
                <Link to={link}>{title}</Link>
            </Typography>
            <DateFormat date={createdAt} />
        </ListCard>
    );
};

export default memo(IssueItem);
