import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@material-ui/core";
import { EntityType } from "../generated/graphql";
import { useProjectQuery } from "../gql/project.query";
import BackButton from "../components/BackButton";
import BaseLoader from "../components/Base/BaseLoader";
import EditDetails from "../components/EditDetails";
import CreatedAt from "../components/Date/CreatedAt";
import StatusIndicator from "../components/StatusIndicator";
import ColumnList from "../components/Project/ColumnList";

type Params = {
    projectID: string;
};

const ProjectView = () => {
    const { projectID } = useParams<Params>();
    const { data, loading } = useProjectQuery({ _id: projectID });

    const renderProject = () => {
        if (loading) {
            return <BaseLoader />;
        }

        if (!data) {
            return <Typography>No Project...</Typography>;
        }

        const {
            _id,
            title,
            description,
            createdAt,
            closed,
            columns,
        } = data.project;

        return (
            <Fragment>
                <Grid container justify="space-between">
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom>
                            {title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            paragraph
                        >
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <EditDetails
                            key="edit-project"
                            _id={_id}
                            type={EntityType.PROJECT}
                            formTitle="Edit Project"
                            defaultValue={{ title, description }}
                        />
                    </Grid>
                </Grid>
                <Box display="flex" alignItems="center" mb={4}>
                    <StatusIndicator closed={closed} />
                    <CreatedAt date={createdAt} mx={1} />
                </Box>
                <ColumnList projectID={_id} columns={columns} />
            </Fragment>
        );
    };

    return (
        <Fragment>
            <BackButton to="/d/project" />
            {renderProject()}
        </Fragment>
    );
};

export default ProjectView;
