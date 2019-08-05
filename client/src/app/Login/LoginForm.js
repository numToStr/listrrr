import React from "react";
import { Form, Field } from "formik";
import { connect } from "react-redux";

import FormLayout from "../../components/Form/FormLayout";
import FormTextField from "../../components/Form/FormFields/FormTextField";
import FormButton from "../../components/Form/FormFields/FormButton";

import { loginSchema } from "../../utils/validations/auth.validation";
import { login } from "../../store/actions/index.action";

const initialValues = { username: "", password: "" };

const LoginForm = ({ $login, _loading }) => {
    return (
        <FormLayout
            key="login-form"
            onSubmit={$login}
            initialValues={initialValues}
            schema={loginSchema}
            render={({ dirty }) => (
                <Form>
                    <Field
                        name="username"
                        label="Username"
                        type="text"
                        required
                        component={FormTextField}
                    />
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                        required
                        component={FormTextField}
                    />
                    <FormButton
                        loading={_loading}
                        disabled={!dirty || _loading}
                    >
                        Login
                    </FormButton>
                </Form>
            )}
        />
    );
};

const mapStateToProps = ({ http: { request } }) => ({
    _loading: request.login
});

const mapDispatchToProps = {
    $login: login
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
