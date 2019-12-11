import React, { FC } from "react";
import { useField, FieldConfig } from "formik";
import { Checkbox, CheckboxProps } from "@material-ui/core";

type Props = FieldConfig & CheckboxProps;

const FormikCheckbox: FC<Props> = ({ name, value, ...props }) => {
    const [field, meta] = useField({
        type: "checkbox",
        name,
        value,
    });

    return <Checkbox {...field} {...meta} {...props} />;
};

export default FormikCheckbox;
