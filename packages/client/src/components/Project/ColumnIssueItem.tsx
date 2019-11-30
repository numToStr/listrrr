import React, { FC, memo } from "react";
import { Box, Grid, Link } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { Issue } from "../../generated/graphql";
import UpdatedAt from "../Date/UpdatedAt";
import BaseRouterLink from "../Base/BaseRouterLink";

type Props = {
    issue: Pick<Issue, "_id" | "title" | "updatedAt">;
    index: number;
};

const ColumnIssueItem: FC<Props> = ({ issue, index }) => {
    return (
        <Draggable draggableId={issue._id} index={index}>
            {(provided, { isDragging }) => (
                <Grid
                    item
                    xs={12}
                    innerRef={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Box
                        p={2}
                        mb={1}
                        bgcolor="background.paper"
                        borderRadius="borderRadius"
                        border={isDragging ? 2 : 1}
                        borderColor={isDragging ? "inherit" : "primary.main"}
                        boxShadow={isDragging ? 5 : 1}
                    >
                        <Link
                            color="textPrimary"
                            component={BaseRouterLink}
                            to={`/d/issue/${issue._id}`}
                            variant="body1"
                        >
                            {issue.title}
                        </Link>
                        <UpdatedAt date={issue.updatedAt} />
                    </Box>
                    {provided.placeholder}
                </Grid>
            )}
        </Draggable>
    );
};

export default memo(ColumnIssueItem);
