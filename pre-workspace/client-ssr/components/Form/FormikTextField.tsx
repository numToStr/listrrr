import React, { FC, InputHTMLAttributes, memo } from "react";
import { useField } from "formik";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

type Props = InputHTMLAttributes<HTMLInputElement> & TextFieldProps;

const FormikTextField: FC<Props> = ({ name, ...props }) => {
    const [{ onChange, onBlur }, { value, touched, error }] = useField({
        name
    });

    return (
        <TextField
            {...props}
            name={name}
            value={value}
            onChange={onChange(name)}
            onBlur={onBlur(name)}
            error={touched && error ? true : false}
            helperText={touched && error ? `- ${error}` : null}
            variant="outlined"
            margin="dense"
            fullWidth
        />
    );
};

export default memo(FormikTextField);
