import React, { memo } from "react";

import Link from "@material-ui/core/Link";

import DateFormat from "../DateFormat";
import Surface from "../Surface";
import Box from "@material-ui/core/Box";
import BaseLink from "../Base/BaseRouterLink";

const IssueItem = ({ _id, title, createdAt, titleProps }) => {
    return (
        <Surface>
            <Box display="flex" flexDirection="column">
                <Link
                    variant="h6"
                    color="textPrimary"
                    component={BaseLink}
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
