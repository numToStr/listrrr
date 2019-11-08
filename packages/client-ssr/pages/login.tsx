import React, { Fragment } from "react";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";
import FormWrapper from "../components/Form/FormWrapper";
import FormCaption from "../components/Form/FormCaption";
import SEO from "../components/SEO";

const initValues = { email: "", password: "" };

const Home = () => {
    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        console.log(values);
    };

    return (
        <Fragment>
            <SEO title="Login" />
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
                href="/signup"
            />
        </Fragment>
    );
};

export default Home;
