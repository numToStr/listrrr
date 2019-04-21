import React from "react";
import { Form, Field } from "formik";
import { connect } from "react-redux";

import FormLayout from "../../components/Form/FormLayout";
import FormTextField from "../../components/Form/FormFields/FormTextField";
import FormButton from "../../components/Form/FormFields/FormButton";

import { signupSchema } from "../../utils/validations/auth.validation";
import { signup } from "../../store/actions/index.action";

const initialValues = { username: "", email: "", password: "" };

const SignupForm = ({ $signup, _loading }) => {
    return (
        <FormLayout
            key="signup-form"
            onSubmit={$signup}
            initialValues={initialValues}
            schema={signupSchema}
            render={({ dirty }) => (
                <Form>
                    <Field
                        name="username"
                        label="Username"
                        type="text"
                        component={FormTextField}
                    />
                    <Field
                        name="email"
                        label="Email"
                        type="email"
                        component={FormTextField}
                    />
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                        component={FormTextField}
                    />
                    <FormButton
                        loading={_loading}
                        disabled={!dirty || _loading}
                    >
                        Signup
                    </FormButton>
                </Form>
            )}
        />
    );
};

const mapStateToProps = ({ http: { request } }) => ({
    _loading: request.signup
});

const mapDispatchToProps = {
    $signup: signup
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);
