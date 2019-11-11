import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, Hidden, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/SettingsTwoTone";
import { useIssueQuery } from "../gql/issue.query";
import BackButton from "../components/BackButton";
import BaseLoader from "../components/Base/BaseLoader";
import BaseBlockQuote from "../components/Base/BaseBlockQuote";
import CreatedAt from "../components/Date/CreatedAt";
import IssueEdit from "../components/Issue/IssueEdit";

type Params = {
    issueID: string;
};

const IssueView = () => {
    const { issueID } = useParams<Params>();
    const { data } = useIssueQuery({ _id: issueID });

    if (!data) {
        return <BaseLoader />;
    }

    const { title, description, createdAt, closed, projects } = data.issue;

    const renderProject = () => {
        if (!projects.length) {
            return <Typography variant="caption">No Projects</Typography>;
        }

        return projects.map(
            project =>
                project && (
                    <Typography variant="caption" key={project._id}>
                        {project.title}
                    </Typography>
                )
        );
    };

    return (
        <Fragment>
            <BackButton to="/d/issue" />
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs>
                    <Typography variant="h4" gutterBottom>
                        {title}
                    </Typography>
                </Grid>
                <Grid item>
                    <IssueEdit defaultValue={{ title, description }} />
                </Grid>
            </Grid>
            <CreatedAt date={createdAt} mb={1} />
            <Typography variant="body2" paragraph>
                Issue is {closed ? "Closed" : "Open"}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                    <Box mb={5}>
                        <BaseBlockQuote bgcolor="primary.main">
                            <Typography variant="body1">
                                {description}
                            </Typography>
                        </BaseBlockQuote>
                    </Box>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                        >
                            <Typography variant="subtitle2">
                                Projects
                            </Typography>
                            <IconButton size="small">
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        {renderProject()}
                    </Grid>
                </Hidden>
            </Grid>
        </Fragment>
    );
};

export default IssueView;
