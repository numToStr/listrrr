import React, { Fragment } from "react";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";
import FormWrapper from "../components/Form/FormWrapper";
import FormCaption from "../components/Form/FormCaption";
import { useSignupMutation } from "../gql/auth.query";
import { useHistory } from "react-router-dom";

const initValues = { username: "", email: "", password: "" };

export const Signup = () => {
    const { push } = useHistory();

    const [handleSignup] = useSignupMutation({
        onCompleted() {
            push("/d");
        }
    });

    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        handleSignup(values);
    };

    return (
        <Fragment>
            <FormWrapper>
                <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
                    <FormikTextField name="username" label="Username" />
                    <FormikTextField name="email" label="Email" type="email" />
                    <FormikTextField
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <FormikSubmitButton>Submit</FormikSubmitButton>
                </FormikForm>
            </FormWrapper>
            <FormCaption
                primary="Already have an account?"
                secondary="Login"
                to="/login"
            />
        </Fragment>
    );
};
