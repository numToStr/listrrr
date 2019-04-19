import React from "react";
import { Formik } from "formik";

const FormLayout = ({ onSubmit, initialValues, schema, render }) => {
    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            render={render}
        />
    );
};

export default FormLayout;
