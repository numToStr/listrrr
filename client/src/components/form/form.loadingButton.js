import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

const LoadingButton = ({ loading, children, ...props }) => {
    return (
        <FormControl margin="normal" fullWidth>
            <Button
                type="Submit"
                color="primary"
                variant="contained"
                {...props}
            >
                {loading ? (
                    <Fade in={loading} unmountOnExit>
                        <CircularProgress size={16} thickness={4} />
                    </Fade>
                ) : (
                    children
                )}
            </Button>
        </FormControl>
    );
};

export default memo(LoadingButton);
