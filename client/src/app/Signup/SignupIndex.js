import React, { Fragment } from "react";

import FormWrapper from "../../components/Form/FormWrapper";
import SignupForm from "./SignupForm";
import FormCaption from "../../components/Form/FormCaption";

const SignupIndex = () => (
    <Fragment>
        <FormWrapper>
            <SignupForm />
        </FormWrapper>
        <FormCaption
            primary="Already have an account?"
            secondary="Login"
            to="/login"
        />
    </Fragment>
);

export default SignupIndex;
