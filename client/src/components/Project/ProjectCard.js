import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import IssueItem from "../Issue/IssueItem";
import DroppableWrapper from "../DragAndDrop/DroppableWrapper";
import DraggableWrapper from "../DragAndDrop/DraggableWrapper";

const useStyles = makeStyles(({ spacing }) => ({
    wrapper: {
        padding: spacing(1.8),
        paddingBottom: spacing(1)
    }
}));

const ProjectCard = ({ droppableId, title, issue = null }) => {
    const classes = useStyles();

    let curIssue = (
        <Typography variant="caption" color="textSecondary">
            No issues.
        </Typography>
    );

    if (issue) {
        curIssue = issue
            .sort((curr, next) => curr.columnIndex - next.columnIndex)
            .map((_issue, $i) => (
                <DraggableWrapper key={_issue._id} id={_issue._id} index={$i}>
                    <IssueItem titleProps={{ variant: "body1" }} {..._issue} />
                </DraggableWrapper>
            ));
    }

    return (
        <Paper elevation={1} className={classes.wrapper}>
            <Typography variant="button" paragraph>
                {title}
            </Typography>
            <DroppableWrapper id={droppableId} type="PROJECT_ISSUE">
                {curIssue}
            </DroppableWrapper>
        </Paper>
    );
};

export default ProjectCard;
