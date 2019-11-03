import React, { Fragment } from "react";
import Head from "next/head";
import { SubmitHandler } from "../@types/types";
import FormikTextField from "../components/Form/FormikTextField";
import FormikSubmitButton from "../components/Form/FormikSubmitButton";
import FormikForm from "../components/Form/FormikForm";

const initValues = { email: "", password: "" };

const Home = () => {
    const handleSubmit: SubmitHandler<typeof initValues> = values => {
        console.log(values);
    };

    return (
        <Fragment>
            <Head>
                <title>Login | Listrr</title>
            </Head>
            <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
                <FormikTextField name="email" label="Email" type="email" />
                <FormikTextField
                    name="password"
                    label="Password"
                    type="password"
                />
                <FormikSubmitButton>Submit</FormikSubmitButton>
            </FormikForm>
        </Fragment>
    );
};

export default Home;
