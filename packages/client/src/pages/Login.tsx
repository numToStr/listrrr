import React, { Fragment } from "react";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";
import FormWrapper from "../components/Form/FormWrapper";
import FormCaption from "../components/Form/FormCaption";
import { useLoginMutation } from "../gql/auth.query";

const initValues = { email: "", password: "" };

const Login = () => {
    const [handleLogin] = useLoginMutation();

    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        handleLogin({
            data: values,
        });
    };

    return (
        <Fragment>
            <FormWrapper>
                <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
                    <FormikTextField
                        name="email"
                        label="Email"
                        type="email"
                        autoFocus
                    />
                    <FormikTextField
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <FormikSubmitButton>Submit</FormikSubmitButton>
                </FormikForm>
            </FormWrapper>
            <FormCaption
                primary="Don't have an account?"
                secondary="Signup"
                to="/signup"
            />
        </Fragment>
    );
};

export default Login;
