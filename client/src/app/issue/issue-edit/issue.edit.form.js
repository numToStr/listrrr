import React from "react";
import { Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";

import InputField from "../../../components/form/form.textField";
import LoadingButton from "../../../components/form/form.loadingButton";

const IssueEditForm = ({ onSubmit, initialValues, loading }) => {
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
                        <Grid container justify="flex-end">
                            <LoadingButton
                                loading={loading}
                                disabled={!dirty || loading}
                                fullWidth={false}
                            >
                                Submit
                            </LoadingButton>
                        </Grid>
                    </form>
                );
            }}
        />
    );
};

export default IssueEditForm;
