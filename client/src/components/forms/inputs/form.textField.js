import React from "react";
import TextField from "@material-ui/core/TextField";

const InputField = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    const error = errors[field.name];
    return (
        <TextField
            variant="outlined"
            margin="dense"
            error={touched && error ? true : false}
            helperText={touched && error ? error : null}
            fullWidth
            {...field}
            {...props}
        />
    );
};

export default InputField;
