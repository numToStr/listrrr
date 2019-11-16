import React, { FC, useCallback, memo } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import { Issue, Maybe } from "../../generated/graphql";
import ColumnIssueItem from "./ColumnIssueItem";
import { RearrangeType } from "../../@types/types";

type Props = {
    droppableId: string;
    issues: Maybe<Issue>[];
};

const ColumnIssueList: FC<Props> = ({ issues = [], droppableId }) => {
    const renderIssueList = useCallback(
        (dragging: boolean) => {
            if (!issues.length) {
                return (
                    !dragging && (
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                No Issue...
                            </Typography>
                        </Grid>
                    )
                );
            }

            return issues.map(
                (issue, index) =>
                    issue && (
                        <ColumnIssueItem
                            key={issue._id}
                            issue={issue}
                            index={index}
                        />
                    )
            );
        },
        [issues]
    );

    return (
        <Droppable
            droppableId={droppableId}
            direction="vertical"
            type={RearrangeType.PROJECT_COLUMN_ISSUE}
        >
            {(provided, { isDraggingOver }) => {
                const bgColor = isDraggingOver
                    ? "secondary.light"
                    : "background.paper";

                return (
                    <Box
                        clone
                        style={{
                            transition: "all 0.3s ease-in-out",
                        }}
                        borderRadius="borderRadius"
                        bgcolor={bgColor}
                    >
                        <Grid
                            container
                            spacing={1}
                            innerRef={provided.innerRef}
                        >
                            {renderIssueList(isDraggingOver)}
                            {provided.placeholder}
                        </Grid>
                    </Box>
                );
            }}
        </Droppable>
    );
};

export default memo(ColumnIssueList);
