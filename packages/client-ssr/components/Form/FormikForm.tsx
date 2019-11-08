import React, { FC } from "react";
import { Formik, Form, FormikConfig } from "formik";

const FormikForm: FC<FormikConfig<any>> = ({ children, ...props }) => {
    return (
        <Formik {...props} validateOnBlur={false} validateOnChange={false}>
            <Form>{children}</Form>
        </Formik>
    );
};

export default FormikForm;
