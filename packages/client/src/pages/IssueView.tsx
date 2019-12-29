import React, { Fragment, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, Hidden } from "@material-ui/core";
import { useIIssueQuery } from "../gql/issue.query";
import BackButton from "../components/BackButton";
import BaseLoader from "../components/Base/BaseLoader";
import BaseBlockQuote from "../components/Base/BaseBlockQuote";
import CreatedAt from "../components/Date/CreatedAt";
import EditDetails from "../components/EditDetails";
import { EntityType, Project, Maybe } from "../generated/graphql";
import StatusIndicator from "../components/StatusIndicator";
import IssueCommentForm from "../components/Issue/IssueCommentForm";
import ProjectSelection from "../components/Project/ProjectSelection";

type Params = {
    issueID: string;
};

const IssueView = () => {
    const { issueID } = useParams<Params>();
    const { loading, data } = useIIssueQuery({
        where: {
            _id: issueID,
        },
    });

    const renderIssueProjects = (
        projects: Maybe<Pick<Project, "_id" | "title">>[]
    ) => {
        if (!projects.length) {
            return <Typography variant="caption">No Projects...</Typography>;
        }

        return <ProjectSelection projects={projects} />;
    };

    const renderIssue = useCallback(() => {
        if (loading) {
            return <BaseLoader />;
        }

        if (!data?.issue) {
            return <Typography>No Issue...</Typography>;
        }

        const {
            _id,
            title,
            description,
            createdAt,
            closed,
            projects,
        } = data.issue;

        return (
            <Fragment>
                <Grid container justify="space-between">
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <EditDetails
                            key="edit-issue"
                            _id={_id}
                            type={EntityType.ISSUE}
                            formTitle="Edit Issue"
                            defaultValue={{ title, description }}
                        />
                    </Grid>
                </Grid>
                <Box display="flex" alignItems="center" mb={2}>
                    <StatusIndicator closed={closed} />
                    <CreatedAt date={createdAt} mx={1} />
                </Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={9}>
                        <Box mb={5}>
                            <BaseBlockQuote bgcolor="primary.main">
                                <Typography variant="body1">
                                    {description}
                                </Typography>
                            </BaseBlockQuote>
                        </Box>
                        <IssueCommentForm issueID={_id} closed={closed} />
                    </Grid>
                    <Hidden xsDown>
                        <Grid item xs>
                            {renderIssueProjects(projects)}
                        </Grid>
                    </Hidden>
                </Grid>
            </Fragment>
        );
    }, [loading, data]);

    return (
        <Fragment>
            <BackButton to="/d/issue" />
            {renderIssue()}
        </Fragment>
    );
};

export default IssueView;
