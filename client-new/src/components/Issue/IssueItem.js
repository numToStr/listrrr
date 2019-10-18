import React, { memo, useMemo } from "react";

import Link from "@material-ui/core/Link";

import DateFormat from "../DateFormat";
import BaseBlockQuote from "../Base/BaseBlockQuote";
import Box from "@material-ui/core/Box";
import BaseLink from "../Base/BaseRouterLink";

const IssueItem = ({
    _id,
    title,
    createdAt,
    updatedAt,
    titleProps,
    isOpen
}) => {
    const color = useMemo(() => (isOpen ? "green" : "red"), [isOpen]);
    return (
        <BaseBlockQuote color={color}>
            <Box display="flex" flexDirection="column">
                <Link
                    noWrap
                    variant="h6"
                    color="textPrimary"
                    component={BaseLink}
                    to={`/d/issues/view/${_id}`}
                    {...titleProps}
                >
                    {title}
                </Link>
                <Box
                    display={{
                        xs: "block",
                        md: "flex"
                    }}
                    justifyContent="space-between"
                >
                    <DateFormat updated date={updatedAt} />
                    <DateFormat date={createdAt} />
                </Box>
            </Box>
        </BaseBlockQuote>
    );
};

export default memo(IssueItem);
