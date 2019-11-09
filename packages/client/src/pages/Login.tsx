import React, { Fragment } from "react";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";
import FormWrapper from "../components/Form/FormWrapper";
import FormCaption from "../components/Form/FormCaption";
import { useLoginMutation } from "../gql/auth.query";
import { useHistory } from "react-router-dom";

const initValues = { email: "", password: "" };

export const Login = () => {
    const { push } = useHistory();

    const [handleLogin] = useLoginMutation({
        onCompleted() {
            push("/d");
        }
    });

    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        handleLogin(values);
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
