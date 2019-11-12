import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import { useProjectQuery } from "../gql/project.query";
import BackButton from "../components/BackButton";
import BaseLoader from "../components/Base/BaseLoader";
import EditDetails from "../components/EditDetails";
import { EntityType } from "../generated/graphql";
import CreatedAt from "../components/Date/CreatedAt";
import StatusIndicator from "../components/StatusIndicator";

type Params = {
    projectID: string;
};

const ProjectView = () => {
    const { projectID } = useParams<Params>();
    const { data } = useProjectQuery({ _id: projectID });

    if (!data) {
        return <BaseLoader />;
    }

    const { _id, title, description, createdAt, closed } = data.project;

    return (
        <Fragment>
            <BackButton to="/d/project" />
            <Grid container justify="space-between">
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                </Grid>
                <Grid item>
                    <EditDetails
                        key="edit-project"
                        _id={_id}
                        type={EntityType.Project}
                        formTitle="Edit Project"
                        defaultValue={{ title, description }}
                    />
                </Grid>
            </Grid>
            <Box display="flex" alignItems="center" mb={2}>
                <StatusIndicator closed={closed} />
                <CreatedAt date={createdAt} mx={1} />
            </Box>
            {/* Draggable Columns */}
        </Fragment>
    );
};

export default ProjectView;
