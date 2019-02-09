import React from "react";
import { connect } from "react-redux";

import FormLayout from "../../components/form/form.layout";
import SignupForm from "./signup.form";
import { signup } from "../../store/actions/index.action";

const initialValues = { username: "", email: "", password: "" };

const Signup = ({ $signup, _loading }) => {
    return (
        <FormLayout>
            <SignupForm
                loading={_loading}
                initialValues={initialValues}
                onSubmit={$signup}
            />
        </FormLayout>
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
