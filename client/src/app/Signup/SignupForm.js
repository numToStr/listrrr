import React from "react";
import { Form, Field } from "formik";

import FormLayout from "../../components/Form/FormLayout";
import InputField from "../../components/Form/FormFields/FormTextField";
import FormButton from "../../components/Form/FormFields/FormButton";

const SignupForm = ({ onSubmit, initialValues, loading }) => {
    return (
        <FormLayout
            key="signup-form"
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ dirty }) => (
                <Form>
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
                    <FormButton loading={loading} disabled={!dirty || loading}>
                        Signup
                    </FormButton>
                </Form>
            )}
        />
    );
};

export default SignupForm;
