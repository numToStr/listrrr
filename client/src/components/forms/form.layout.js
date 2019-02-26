import React from "react";
import { Formik, Field } from "formik";

import InputField from "../../components/forms/inputs/form.textField";
import LoadingButton from "../../components/forms/inputs/form.loadingButton";

const FormLayout = ({ config, onSubmit, initialValues, loading }) => {
    const Fields = props =>
        config.fields.map(({ ...field }) => (
            <Field
                key={field.name}
                component={InputField}
                {...field}
                {...props}
            />
        ));

    const Actions = props =>
        config.actions.map(({ title, type }) => (
            <LoadingButton key={type} {...props} type={type}>
                {title}
            </LoadingButton>
        ));

    return (
        <Formik
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={initialValues}
            render={({ handleSubmit, dirty, ...props }) => {
                return (
                    <form onSubmit={handleSubmit} noValidate>
                        <Fields />
                        <Actions
                            loading={loading}
                            disabled={!dirty || loading}
                        />
                    </form>
                );
            }}
        />
    );
};

export default FormLayout;
