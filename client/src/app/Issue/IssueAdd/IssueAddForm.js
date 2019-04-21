import React from "react";
import { Field, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import InputField from "../../../components/Form/FormFields/FormTextField";
import SelectField from "../../../components/Form/FormFields/FormSelect";
import LoadingButton from "../../../components/Form/FormFields/FormButton";
import FormLayout from "../../../components/Form/FormLayout";

const IssueAddForm = ({ onSubmit, initialValues, loading, options }) => (
    <FormLayout
        onSubmit={onSubmit}
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

export default IssueAddForm;
