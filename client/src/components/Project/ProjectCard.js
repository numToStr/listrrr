import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import IssueItem from "../Issue/IssueItem";

const styles = ({ spacing }) => ({
    wrapper: {
        padding: spacing.unit * 1.8,
        paddingBottom: spacing.unit
    }
});

const ProjectCard = ({ classes, title, issue = null }) => {
    let curIssue = (
        <Typography variant="caption" color="textSecondary">
            No issues.
        </Typography>
    );
    if (issue) {
        curIssue = issue.map(_issue => (
            <IssueItem
                key={_issue._id}
                titleProps={{ variant: "body1" }}
                {..._issue}
            />
        ));
    }

    return (
        <Grid item xs>
            <Paper elevation={1} className={classes.wrapper}>
                <Typography variant="button" paragraph>
                    {title}
                </Typography>
                {curIssue}
            </Paper>
        </Grid>
    );
};

export default withStyles(styles)(ProjectCard);
