import React from "react";
import { Formik, Field } from "formik";

import InputField from "../../components/form/form.textField";
import LoadingButton from "../../components/form/form.loadingButton";

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
                            name="username"
                            label="Username"
                            type="text"
                            component={InputField}
                        />
                        <Field
                            name="email"
                            label="Email"
                            type="email"
                            component={InputField}
                        />
                        <Field
                            name="password"
                            label="Password"
                            type="password"
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
