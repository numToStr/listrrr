import React, { memo, ButtonHTMLAttributes, FC } from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { useFormikContext } from "formik";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

const FormButton: FC<Props> = ({ children, fullWidth = true, ...props }) => {
    const { dirty, isSubmitting } = useFormikContext();

    return (
        <FormControl margin="normal" fullWidth={fullWidth}>
            <Button
                {...props}
                type="submit"
                color="primary"
                variant="contained"
                disabled={!dirty || isSubmitting}
                startIcon={
                    <Fade in={isSubmitting} unmountOnExit>
                        <CircularProgress size={22} thickness={4} />
                    </Fade>
                }
            >
                {children}
            </Button>
        </FormControl>
    );
};

export default memo(FormButton);
