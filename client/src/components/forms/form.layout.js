import React from "react";
import { Formik, Field, Form } from "formik";
import Grid from "@material-ui/core/Grid";

import InputField from "../../components/forms/inputs/form.textField";
import LoadingButton from "../../components/forms/inputs/form.loadingButton";

const FormLayout = ({ config, onSubmit, initialValues, loading, schema }) => {
    const Fields = props =>
        config.fields.map(({ muiProps, ...field }) => (
            <Field
                key={field.name}
                component={InputField}
                {...muiProps}
                {...field}
                {...props}
            />
        ));

    const Actions = props =>
        config.actions.map(({ title, type, muiProps }) => (
            <LoadingButton key={type} {...props} type={type} {...muiProps}>
                {title}
            </LoadingButton>
        ));

    return (
        <Formik
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={schema}
            render={({ dirty }) => (
                <Form>
                    <Fields />
                    <Grid container justify="flex-end">
                        <Actions
                            loading={loading}
                            disabled={!dirty || loading}
                        />
                    </Grid>
                </Form>
            )}
        />
    );
};

export default FormLayout;
