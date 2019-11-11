import React, { memo, useMemo, FC } from "react";
import { Box, Typography, Link } from "@material-ui/core";

import BaseBlockQuote from "../Base/BaseBlockQuote";
// import BaseLink from "../Base/BaseRouterLink";
import UpdatedAt from "../Date/UpdatedAt";
import CreatedAt from "../Date/CreatedAt";
import { IssueParts } from "../../gql/issue.query";

type Props = {
    issue: IssueParts;
};

const IssueItem: FC<Props> = ({ issue }) => {
    const { title, description, closed, createdAt, updatedAt } = issue;

    const color = useMemo(() => (closed ? "green" : "red"), [closed]);

    return (
        <BaseBlockQuote bgcolor={color}>
            <Box display="flex" flexDirection="column">
                <Link
                    noWrap
                    variant="h6"
                    color="textPrimary"
                    href="#!"
                    // component={BaseLink}
                    // to={`/d/projects/view/${_id}`}
                >
                    {title}
                </Link>
                <Typography variant="body2" gutterBottom>
                    {description}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <UpdatedAt date={updatedAt} />
                    <CreatedAt date={createdAt} />
                </Box>
            </Box>
        </BaseBlockQuote>
    );
};

export default memo(IssueItem);
