import React, { memo } from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import DateFormat from "../DateFormat";
import Surface from "../Surface";

const IssueItem = ({ _id, title, createdAt, titleProps }) => {
    const link = `/d/issues/view/${_id}`;

    return (
        <Surface>
            <Typography variant="h6" {...titleProps}>
                <Link style={{ textDecoration: "none" }} to={link}>
                    {title}
                </Link>
            </Typography>
            <DateFormat date={createdAt} />
        </Surface>
    );
};

export default memo(IssueItem);
