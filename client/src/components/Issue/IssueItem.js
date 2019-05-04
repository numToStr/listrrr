import React, { memo, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";

import DateFormat from "../DateFormat";
import Surface from "../Surface";
import Box from "@material-ui/core/Box";

const IssueItem = ({ _id, title, createdAt, titleProps }) => {
    const AdapterLink = forwardRef((props, ref) => (
        <RouterLink innerRef={ref} {...props} />
    ));

    return (
        <Surface>
            <Box display="flex" flexDirection="column">
                <Link
                    variant="h6"
                    color="textPrimary"
                    component={AdapterLink}
                    to={`/d/issues/view/${_id}`}
                    {...titleProps}
                >
                    {title}
                </Link>
                <DateFormat date={createdAt} />
            </Box>
        </Surface>
    );
};

export default memo(IssueItem);
