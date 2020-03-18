import React, { FC, memo } from "react";
import { Box, Grid, Link } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { Issue } from "../../generated/graphql";
import UpdatedAt from "../Date/UpdatedAt";
import BaseRouterLink from "../Base/BaseRouterLink";
import StatusIndicatorIcon from "../StatusIndicatorIcon";

type Props = {
    issue: Pick<Issue, "_id" | "title" | "updatedAt" | "closed">;
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
                        bgcolor="background.paper"
                        borderRadius="borderRadius"
                        border={isDragging ? 2 : 1}
                        borderColor={isDragging ? "grey.700" : "grey.500"}
                        boxShadow={isDragging ? 5 : 0}
                    >
                        <Box display="flex" alignItems="center">
                            <Link
                                color="textPrimary"
                                component={BaseRouterLink}
                                to={`/d/issue/${issue._id}`}
                                variant="body1"
                            >
                                {issue.title}
                            </Link>
                            <StatusIndicatorIcon closed={issue.closed} />
                        </Box>
                        <UpdatedAt date={issue.updatedAt} />
                    </Box>
                </Grid>
            )}
        </Draggable>
    );
};

export default memo(ColumnIssueItem);
