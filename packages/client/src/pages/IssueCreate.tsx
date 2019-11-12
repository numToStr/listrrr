import React, { Fragment } from "react";
import { Typography, Grid, Box } from "@material-ui/core";
import { SubmitHandler } from "../@types/types";
import FormikForm from "../components/Form/FormikForm";
import FormikTextField from "../components/Form/FormikTextField";
import FormikTextArea from "../components/Form/FormikTextArea";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import BackButton from "../components/BackButton";
import FormikSelect from "../components/Form/FormikSelect";

const initValues = {
    title: "",
    description: "",
    projects: []
};

const IssueCreate = () => {
    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        console.log(values);
    };

    return (
        <Fragment>
            <BackButton to="/d/issue" />
            <Typography variant="h5" paragraph>
                Create Project
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
                                Submit
                            </FormikSubmitButton>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <FormikSelect
                            name="projects"
                            label="Project Template"
                            multiple
                            options={[{ _id: "asdfa", title: "asdflajsdkf" }]}
                        />
                    </Grid>
                </Grid>
            </FormikForm>
        </Fragment>
    );
};

export default IssueCreate;
