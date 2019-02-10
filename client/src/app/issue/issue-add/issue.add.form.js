import React from "react";
import { Formik, Field } from "formik";

import InputField from "../../../components/form/form.textField";
import LoadingButton from "../../../components/form/form.loadingButton";

const SignupForm = ({ onSubmit, initialValues, loading }) => {
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
                            autoFocus
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
                        <LoadingButton
                            loading={loading}
                            disabled={!dirty || loading}
                        >
                            Signup
                        </LoadingButton>
                    </form>
                );
            }}
        />
    );
};

export default SignupForm;
