import React from "react";
import { connect } from "react-redux";

import FormWrapper from "../../components/Form/FormWrapper";
import FormLayout from "../../components/Form/FormLayout";

import { loginSchema } from "../../utils/validations/auth.validation";
import { login } from "../../store/actions/index.action";

const initialValues = { username: "", password: "" };

const config = {
    fields: [
        {
            type: "text",
            name: "username",
            label: "Username"
        },
        {
            type: "password",
            name: "password",
            label: "Password"
        }
    ],
    actions: [
        {
            type: "submit",
            title: "Login"
        }
    ]
};

const LoginIndex = ({ $login, _loading }) => {
    return (
        <FormWrapper>
            <FormLayout
                key="login-form"
                config={config}
                loading={_loading}
                initialValues={initialValues}
                onSubmit={$login}
                schema={loginSchema}
            />
        </FormWrapper>
    );
};

const mapStateToProps = ({ http: { request } }) => ({
    _loading: request.login
});

const mapDispatchToProps = dispatchEvent => ({
    $login: val => dispatchEvent(login(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginIndex);
