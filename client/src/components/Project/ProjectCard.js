import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import IssueItem from "../Issue/IssueItem";
import DroppableWrapper from "../DragAndDrop/DroppableWrapper";
import DraggableWrapper from "../DragAndDrop/DraggableWrapper";

const styles = ({ spacing }) => ({
    wrapper: {
        padding: spacing.unit * 1.8,
        paddingBottom: spacing.unit
    }
});

const ProjectCard = ({ classes, droppableId, title, issue = null }) => {
    let curIssue = (
        <Typography variant="caption" color="textSecondary">
            No issues.
        </Typography>
    );

    if (issue) {
        curIssue = issue.map((_issue, $i) => (
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
            <DroppableWrapper id={droppableId} type="PROJECT_LIST">
                {curIssue}
            </DroppableWrapper>
        </Paper>
    );
};

export default withStyles(styles)(ProjectCard);
