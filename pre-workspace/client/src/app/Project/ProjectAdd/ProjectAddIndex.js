import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import HeaderBackButton from "../../../components/Header/HeaderBackButton";
import ProjectAddForm from "./ProjectAddForm";
import { projectAdd } from "../../../store/requests/project.request";

const ProjectAddIndex = ({ history }) => {
    const handleSubmit = async (values, formikBag) => {
        await projectAdd(values);

        formikBag.setSubmitting(false);

        history.push("/d/projects");
    };

    return (
        <Fragment>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <HeaderBackButton to="/d/projects/list" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        New Project
                    </Typography>
                </Grid>
            </Grid>
            <ProjectAddForm onSubmit={handleSubmit} history={history} />
        </Fragment>
    );
};

export default ProjectAddIndex;
