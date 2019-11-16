import React, { FC, memo } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { Issue } from "../../generated/graphql";
import UpdatedAt from "../Date/UpdatedAt";

type Props = {
    issue: Issue;
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
                        bgcolor="#fff"
                        borderRadius="borderRadius"
                        border={isDragging ? 2 : 1}
                        borderColor={
                            isDragging ? "secondary.main" : "primary.main"
                        }
                        boxShadow={isDragging ? 5 : 1}
                    >
                        <Typography gutterBottom>{issue.title}</Typography>
                        <UpdatedAt date={issue.updatedAt} />
                    </Box>
                    {provided.placeholder}
                </Grid>
            )}
        </Draggable>
    );
};

export default memo(ColumnIssueItem);
