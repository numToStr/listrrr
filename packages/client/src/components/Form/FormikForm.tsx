import React, { FC, Fragment } from "react";
import { Formik, Form, FormikConfig } from "formik";
import { Paper } from "@material-ui/core";

type Props = FormikConfig<any> & {
    error?: string;
};

const FormikForm: FC<Props> = ({ children, error, ...props }) => {
    return (
        <Fragment>
            {!!error && <Paper>{error}</Paper>}
            <Formik {...props} validateOnBlur={false} validateOnChange={false}>
                <Form>{children}</Form>
            </Formik>
        </Fragment>
    );
};

export default FormikForm;
