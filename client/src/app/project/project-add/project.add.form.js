import React from "react";
import { Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";

import InputField from "../../../components/form/form.textField";
import SelectField from "../../../components/form/form.select";
import LoadingButton from "../../../components/form/form.loadingButton";

const ProjectAddForm = ({ onSubmit, initialValues, loading, templates }) => {
    return (
        <Formik
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={initialValues}
            render={({ handleSubmit, dirty, ...props }) => {
                return (
                    <form onSubmit={handleSubmit} noValidate>
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
                        {/* <Grid container justify="flex-end">
                        </Grid> */}
                    </form>
                );
            }}
        />
    );
};

export default ProjectAddForm;
