import React from "react";
import { connect } from "react-redux";

import FormWrapper from "../../components/Form/FormWrapper";

import { signupSchema } from "../../utils/validations/auth.validation";
import { signup } from "../../store/actions/index.action";
import SignupForm from "./SignupForm";

const initialValues = { username: "", email: "", password: "" };

const Signup = ({ $signup, _loading }) => {
    return (
        <FormWrapper>
            <SignupForm
                initialValues={initialValues}
                onSubmit={$signup}
                schema={signupSchema}
                loading={_loading}
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
