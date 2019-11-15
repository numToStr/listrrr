import React, { memo, useMemo, FC } from "react";
import { Box, Typography, Link } from "@material-ui/core";

import BaseBlockQuote from "../Base/BaseBlockQuote";
import UpdatedAt from "../Date/UpdatedAt";
import CreatedAt from "../Date/CreatedAt";
import BaseRouterLink from "../Base/BaseRouterLink";
import { IssueFragment } from "../../gql/issue.query";

type Props = {
    issue: IssueFragment;
};

const IssueItem: FC<Props> = ({ issue }) => {
    const { _id, title, description, closed, createdAt, updatedAt } = issue;

    const color = useMemo(() => (closed ? "red" : "green"), [closed]);

    return (
        <BaseBlockQuote bgcolor={color}>
            <Box display="flex" flexDirection="column">
                <Link
                    noWrap
                    variant="h6"
                    color="textPrimary"
                    href="#!"
                    component={BaseRouterLink}
                    to={`/d/issue/${_id}`}
                >
                    {title}
                </Link>
                <Typography variant="body2" gutterBottom>
                    {description}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <CreatedAt date={createdAt} />
                    <UpdatedAt date={updatedAt} />
                </Box>
            </Box>
        </BaseBlockQuote>
    );
};

export default memo(IssueItem);
