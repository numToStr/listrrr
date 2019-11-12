import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useProjectQuery } from "../gql/project.query";
import BackButton from "../components/BackButton";
import BaseLoader from "../components/Base/BaseLoader";
import { Grid, Typography } from "@material-ui/core";
import EditDetails from "../components/EditDetails";
import UpdatedAt from "../components/Date/UpdatedAt";
import { EntityType } from "../generated/graphql";

type Params = {
    projectID: string;
};

const ProjectView = () => {
    const { projectID } = useParams<Params>();
    const { data } = useProjectQuery({ _id: projectID });

    if (!data) {
        return <BaseLoader />;
    }

    const { _id, title, description, updatedAt } = data.project;

    return (
        <Fragment>
            <BackButton to="/d/project" />
            <Grid container justify="space-between">
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        gutterBottom
                    >
                        {description}
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
            <UpdatedAt date={updatedAt} />
            {/* Draggable Columns */}
        </Fragment>
    );
};

export default ProjectView;
