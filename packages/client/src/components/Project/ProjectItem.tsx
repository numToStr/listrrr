import React, { memo, useMemo, FC } from "react";
import { Box, Typography, Link } from "@material-ui/core";

// import DateFormat from "../DateFormat";
import BaseBlockQuote from "../Base/BaseBlockQuote";
// import BaseLink from "../Base/BaseRouterLink";
import { ProjectParts } from "../../gql/project.query";

type Props = {
    project: ProjectParts;
};

const ProjectItem: FC<Props> = ({ project }) => {
    const { title, description, closed } = project;

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
                <Box
                    display={{
                        xs: "block",
                        md: "flex"
                    }}
                    justifyContent="space-between"
                >
                    {/* <DateFormat date={updatedAt} updated />
                    <DateFormat date={createdAt} /> */}
                </Box>
            </Box>
        </BaseBlockQuote>
    );
};

export default memo(ProjectItem);
