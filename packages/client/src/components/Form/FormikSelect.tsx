import React, { FC, memo, useMemo } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from "@material-ui/core";
import { FieldConfig, useField } from "formik";
import { SelectProps } from "@material-ui/core/Select";

type Props = FieldConfig &
    SelectProps & {
        options: Array<{
            _id: string;
            title: string;
        }>;
        label: string;
    };

const FormikSelect: FC<Props> = ({ name, options, ...props }) => {
    const [{ onChange, onBlur }, { value, touched, error }] = useField({
        name
    });

    const isError = touched && !!error;

    const items = useMemo(() => {
        return options.map(({ _id, title }) => (
            <MenuItem key={_id} value={_id} dense>
                {title}
            </MenuItem>
        ));
    }, [options]);

    return (
        <FormControl margin="dense" fullWidth error={isError}>
            <InputLabel id={`formik-select-${name}`}>{props.label}</InputLabel>
            <Select
                labelId={`formik-select-${name}`}
                id={`formik-select-${name}`}
                value={value}
                onChange={onChange(name)}
                onBlur={onBlur(name)}
                {...props}
            >
                {items}
            </Select>
            {isError && <FormHelperText> - {error}</FormHelperText>}
        </FormControl>
    );
};

export default memo(FormikSelect);
