import React from "react";
import { connect } from "react-redux";

import FormWrapper from "../../components/forms/form.wrapper";
import FormLayout from "../../components/forms/form.layout";
import { signup } from "../../store/actions/index.action";

const initialValues = { username: "", email: "", password: "" };

const config = {
    fields: [
        {
            type: "text",
            name: "username",
            label: "Username"
        },
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

const Signup = ({ $signup, _loading }) => {
    return (
        <FormWrapper>
            <FormLayout
                key="signup-form"
                config={config}
                loading={_loading}
                initialValues={initialValues}
                onSubmit={$signup}
            />
        </FormWrapper>
    );
};

const mapStateToProps = ({ http: { request } }) => ({
    _loading: request.signup
});

const mapDispatchToProps = dispatchEvent => ({
    $signup: val => dispatchEvent(signup(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
