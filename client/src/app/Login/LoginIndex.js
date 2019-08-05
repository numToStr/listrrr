import React, { Fragment } from "react";

import FormWrapper from "../../components/Form/FormWrapper";
import LoginForm from "./LoginForm";
import FormCaption from "../../components/Form/FormCaption";

const LoginIndex = () => (
    <Fragment>
        <FormWrapper>
            <LoginForm />
        </FormWrapper>
        <FormCaption
            primary="Don't have an account?"
            secondary="Sign up"
            to="/signup"
        />
    </Fragment>
);

export default LoginIndex;
