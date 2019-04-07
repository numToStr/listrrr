import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import IssueItem from "../Issue/IssueItem";

const ProjectCard = ({ title, issue = null }) => {
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
            <Card>
                <CardContent>
                    <Typography variant="button" paragraph>
                        {title}
                    </Typography>
                    {curIssue}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProjectCard;
