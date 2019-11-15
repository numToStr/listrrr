import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, Hidden, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/SettingsTwoTone";
import { useIssueQuery } from "../gql/issue.query";
import BackButton from "../components/BackButton";
import BaseLoader from "../components/Base/BaseLoader";
import BaseBlockQuote from "../components/Base/BaseBlockQuote";
import CreatedAt from "../components/Date/CreatedAt";
import EditDetails from "../components/EditDetails";
import { EntityType } from "../generated/graphql";
import StatusIndicator from "../components/StatusIndicator";
import IssueCommentForm from "../components/Issue/IssueCommentForm";

type Params = {
    issueID: string;
};

const IssueView = () => {
    const { issueID } = useParams<Params>();
    const { data } = useIssueQuery({ _id: issueID });

    if (!data) {
        return <BaseLoader />;
    }

    const { _id, title, description, createdAt, closed, projects } = data.issue;

    const renderProjects = () => {
        if (!projects.length) {
            return <Typography variant="caption">No Projects</Typography>;
        }

        return projects.map(
            project =>
                project && (
                    <Typography
                        key={project._id}
                        variant="caption"
                        component="p"
                        gutterBottom
                    >
                        - {project.title}
                    </Typography>
                )
        );
    };

    return (
        <Fragment>
            <BackButton to="/d/issue" />
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
                        type={EntityType.Issue}
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
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={0.5}
                        >
                            <Typography variant="subtitle2">
                                Projects
                            </Typography>
                            <IconButton size="small">
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        {renderProjects()}
                    </Grid>
                </Hidden>
            </Grid>
        </Fragment>
    );
};

export default IssueView;
