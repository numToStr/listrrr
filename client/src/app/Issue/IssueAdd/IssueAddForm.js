// Note: I am not using FormLayout component because its layout is different

import React from "react";
import { Formik, Field, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import InputField from "../../../components/Form/FormFields/FormTextField";
import SelectField from "../../../components/Form/FormFields/FormSelect";
import LoadingButton from "../../../components/Form/FormFields/FormButton";

const IssueAddForm = ({ onSubmit, initialValues, loading, options }) => {
    return (
        <Formik
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={initialValues}
            render={({ dirty }) => (
                <Form>
                    <Grid container spacing={16}>
                        <Grid item xs={9}>
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
                            <Grid container justify="flex-end">
                                <LoadingButton
                                    loading={loading}
                                    disabled={!dirty || loading}
                                    fullWidth={false}
                                >
                                    Submit
                                </LoadingButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="project"
                                type="text"
                                label="Add to project"
                                component={SelectField}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        />
    );
};

export default IssueAddForm;
