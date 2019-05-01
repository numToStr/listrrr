import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import IssueItem from "../Issue/IssueItem";
import DroppableWrapper from "../DragAndDrop/DroppableWrapper";
import DraggableWrapper from "../DragAndDrop/DraggableWrapper";

const ProjectCard = ({ droppableId, title, issue = null }) => {
    let curIssue = (
        <Box pl={0.5} pb={0.5}>
            <Typography variant="caption" color="textSecondary">
                No issues.
            </Typography>
        </Box>
    );

    if (issue) {
        curIssue = issue
            .sort((curr, next) => curr.columnIndex - next.columnIndex)
            .map((_issue, $i) => (
                <DraggableWrapper
                    key={_issue._id}
                    id={_issue._id}
                    index={$i}
                    width={12}
                >
                    <IssueItem titleProps={{ variant: "body1" }} {..._issue} />
                </DraggableWrapper>
            ));
    }

    return (
        <Paper elevation={1}>
            <Box p={1.8}>
                <Typography variant="button" paragraph>
                    {title}
                </Typography>
                <DroppableWrapper id={droppableId} type="PROJECT_ISSUE">
                    {curIssue}
                </DroppableWrapper>
            </Box>
        </Paper>
    );
};

export default ProjectCard;
