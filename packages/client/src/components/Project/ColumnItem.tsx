import React, { FC, memo } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { ColumnFragmentFragment } from "../../generated/graphql";
import ColumnIssueList from "./ColumnIssueList";

type Props = {
    column: ColumnFragmentFragment;
    index: number;
};

const ColumnItem: FC<Props> = ({ column, index }) => {
    return (
        <Draggable draggableId={column._id} index={index}>
            {(provided, { isDragging }) => {
                return (
                    <Grid
                        item
                        xs
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Box
                            p={1.5}
                            bgcolor="background.paper"
                            height="100%"
                            borderRadius="borderRadius"
                            boxShadow={isDragging ? 5 : 0}
                            border={`${isDragging ? 2 : 1}px solid #aaa`}
                        >
                            <Box mb={1}>
                                <Typography variant="subtitle2">
                                    {column.title}
                                </Typography>
                            </Box>

                            <ColumnIssueList
                                droppableId={column._id}
                                issues={column.issues}
                            />
                        </Box>
                    </Grid>
                );
            }}
        </Draggable>
    );
};

export default memo(ColumnItem);
