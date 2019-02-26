import React from "react";
import { connect } from "react-redux";

import FormWrapper from "../../components/forms/form.wrapper";
import FormLayout from "../../components/forms/form.layout";
import { login } from "../../store/actions/index.action";

const initialValues = { username: "", password: "" };

const config = {
    fields: [
        {
            type: "email",
            name: "email",
            label: "Email"
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
            title: "Signup"
        }
    ]
};

const Login = ({ $login, _loading }) => {
    return (
        <FormWrapper>
            <FormLayout
                key="login-form"
                config={config}
                loading={_loading}
                initialValues={initialValues}
                onSubmit={$login}
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
)(Login);
