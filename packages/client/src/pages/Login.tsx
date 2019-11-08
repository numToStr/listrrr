import React, { Fragment } from "react";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";
import FormWrapper from "../components/Form/FormWrapper";
import FormCaption from "../components/Form/FormCaption";
import { gql, useMutation } from "@apollo/client";

const initValues = { email: "", password: "" };

const LOGIN = gql`
    mutation Login($data: LoginInput!) {
        login(data: $data) {
            user {
                _id
                username
                email
            }
            auth {
                token
                role
            }
        }
    }
`;

const Login = () => {
    const [handleLogin] = useMutation(LOGIN);

    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        handleLogin({
            variables: {
                data: values
            }
        });
    };

    return (
        <Fragment>
            <FormWrapper>
                <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
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
                primary="Don't have an account?"
                secondary="Signup"
                to="/signup"
            />
        </Fragment>
    );
};

export default Login;
