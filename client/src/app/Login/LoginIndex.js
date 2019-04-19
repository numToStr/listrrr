import React from "react";
import { connect } from "react-redux";

import FormWrapper from "../../components/Form/FormWrapper";
import LoginForm from "./LoginForm";

import { loginSchema } from "../../utils/validations/auth.validation";
import { login } from "../../store/actions/index.action";

const initialValues = { username: "", password: "" };

const LoginIndex = ({ $login, _loading }) => {
    return (
        <FormWrapper>
            <LoginForm
                initialValues={initialValues}
                onSubmit={$login}
                schema={loginSchema}
                loading={_loading}
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
