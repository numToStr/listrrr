import React, { Fragment } from "react";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";
import FormWrapper from "../components/Form/FormWrapper";
import FormCaption from "../components/Form/FormCaption";
import { gql, useMutation } from "@apollo/client";

const SIGNUP = gql`
    mutation Signup($data: SignupInput!) {
        signup(data: $data) {
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

const initValues = { username: "", email: "", password: "" };

const Signup = () => {
    const [handleSignup] = useMutation(SIGNUP);

    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        handleSignup({
            variables: {
                data: values
            }
        });
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

export default Signup;
