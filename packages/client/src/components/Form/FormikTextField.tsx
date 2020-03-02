import React, { FC, memo } from "react";
import { useField, FieldConfig } from "formik";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

type Props = FieldConfig & TextFieldProps;

const FormikTextField: FC<Props> = ({ name, ...props }) => {
    const [field, { touched, error }] = useField({
        name,
    });

    const isError = Boolean(touched && error);

    return (
        <TextField
            error={isError}
            helperText={isError ? `- ${error}` : null}
            variant="outlined"
            margin="dense"
            fullWidth
            {...field}
            {...props}
        />
    );
};

export default memo(FormikTextField);
