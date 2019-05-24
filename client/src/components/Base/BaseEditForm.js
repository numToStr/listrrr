import React from "react";
import { Form, Field } from "formik";

import FormLayout from "../Form/FormLayout";
import InputField from "../Form/FormFields/FormTextField";
import FormButton from "../Form/FormFields/FormButton";

const BaseEditForm = ({ initialValues, loading, onSubmit }) => (
    <FormLayout
        onSubmit={onSubmit}
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
                    rows={5}
                    component={InputField}
                />
                <FormButton disabled={!dirty || loading} variant="outlined">
                    Submit
                </FormButton>
            </Form>
        )}
    />
);

export default BaseEditForm;
