import React, { memo, useMemo } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import DateFormat from "../DateFormat";
import BaseBlockQuote from "../Base/BaseBlockQuote";
import BaseLink from "../Base/BaseRouterLink";

const ProjectItem = ({
    _id,
    title,
    description,
    createdAt,
    updatedAt,
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
                    to={`/d/projects/view/${_id}`}
                >
                    {title}
                </Link>
                <Typography variant="body2" gutterBottom>
                    {description}
                </Typography>
                <Box
                    display={{
                        xs: "block",
                        md: "flex"
                    }}
                    justifyContent="space-between"
                >
                    <DateFormat date={updatedAt} updated />
                    <DateFormat date={createdAt} />
                </Box>
            </Box>
        </BaseBlockQuote>
    );
};

export default memo(ProjectItem);
