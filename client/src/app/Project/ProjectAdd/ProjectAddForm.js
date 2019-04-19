// Note: I am not using FormLayout component because its layout is different

import React from "react";
import { Formik, Form, Field } from "formik";
import Grid from "@material-ui/core/Grid";

import InputField from "../../../components/Form/FormFields/FormTextField";
import SelectField from "../../../components/Form/FormFields/FormSelect";
import LoadingButton from "../../../components/Form/FormFields/FormButton";

const ProjectAddForm = ({ onSubmit, initialValues, loading, templates }) => {
    return (
        <Formik
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={initialValues}
            render={({ dirty }) => (
                <Form>
                    <Field
                        name="title"
                        label="Title"
                        type="text"
                        component={InputField}
                    />
                    <Field
                        name="description"
                        label="Description"
                        type="text"
                        multiline
                        rows={6}
                        rowsMax={10}
                        component={InputField}
                    />
                    <Grid container justify="space-between">
                        <Grid item xs={4}>
                            <Field
                                name="template"
                                type="text"
                                label="Project Template"
                                component={SelectField}
                                options={templates}
                            />
                        </Grid>
                        <Grid item>
                            <LoadingButton
                                loading={loading}
                                disabled={!dirty || loading}
                                fullWidth={false}
                            >
                                Submit
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            )}
        />
    );
};

export default ProjectAddForm;
