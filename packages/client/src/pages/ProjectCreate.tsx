import React, { Fragment } from "react";
import { Typography, Grid, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SubmitHandler } from "../@types/types";
import FormikForm from "../components/Form/FormikForm";
import FormikTextField from "../components/Form/FormikTextField";
import FormikTextArea from "../components/Form/FormikTextArea";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import BackButton from "../components/BackButton";
import FormikSelect from "../components/Form/FormikSelect";
import { useTemplatesQuery } from "../gql/template.query";
import BaseLoader from "../components/Base/BaseLoader";
import { useCreateProjectMutation } from "../gql/project.query";

const initValues = {
    title: "",
    description: "",
    templateID: ""
};

const IssueCreate = () => {
    const { push } = useHistory();
    const { data, loading } = useTemplatesQuery();
    const [handleCreateProject] = useCreateProjectMutation({
        onCompleted() {
            push("/d/project");
        }
    });

    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        handleCreateProject({
            data: values
        });
    };

    if (loading) {
        return <BaseLoader />;
    }

    const renderTemplates = () => {
        if (!data) {
            return <Typography>Unable to get template</Typography>;
        }

        return (
            <FormikSelect
                name="templateID"
                label="Select a Template"
                options={data.templates}
            />
        );
    };

    return (
        <Fragment>
            <BackButton to="/d/issue" />
            <Typography variant="h5" paragraph>
                New Project
            </Typography>
            <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
                <Grid container spacing={4}>
                    <Grid item xs={9}>
                        <FormikTextField name="title" label="Title" />
                        <FormikTextArea
                            name="description"
                            label="Description"
                        />
                        <Box display="flex" justifyContent="flex-end">
                            <FormikSubmitButton fullWidth={false}>
                                Create Project
                            </FormikSubmitButton>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        {renderTemplates()}
                    </Grid>
                </Grid>
            </FormikForm>
        </Fragment>
    );
};

export default IssueCreate;
