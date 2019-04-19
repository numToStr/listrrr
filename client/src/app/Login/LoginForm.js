import React from "react";
import { Form, Field } from "formik";

import FormLayout from "../../components/Form/FormLayout";
import InputField from "../../components/Form/FormFields/FormTextField";
import FormButton from "../../components/Form/FormFields/FormButton";

const LoginForm = ({ onSubmit, initialValues, schema, loading }) => {
    return (
        <FormLayout
            key="login-form"
            onSubmit={onSubmit}
            initialValues={initialValues}
            schema={schema}
            render={({ dirty }) => (
                <Form>
                    <Field
                        name="username"
                        label="Username"
                        type="text"
                        component={InputField}
                    />
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                        component={InputField}
                    />
                    <FormButton loading={loading} disabled={!dirty || loading}>
                        Login
                    </FormButton>
                </Form>
            )}
        />
    );
};

export default LoginForm;
