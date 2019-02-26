import React from "react";
import { Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/CheckTwoTone";
import CancelIcon from "@material-ui/icons/CloseTwoTone";
import InputField from "./form.textField";

const TitleEditForm = ({
    show,
    initialValues,
    btnClass,
    onCancel,
    onSubmit
}) => {
    return (
        <Formik
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={initialValues}
            render={({ handleSubmit, dirty, ...props }) => (
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    style={{ width: "100%" }}
                >
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        style={{ marginBottom: "1rem" }}
                    >
                        <Grid item>
                            <Zoom in={show}>
                                <Field
                                    name="title"
                                    type="text"
                                    variant="outlined"
                                    margin="dense"
                                    component={InputField}
                                />
                            </Zoom>
                        </Grid>
                        <Grid item>
                            <Zoom in={show}>
                                <IconButton
                                    className={btnClass}
                                    onClick={onCancel}
                                    type="reset"
                                >
                                    <CancelIcon fontSize="small" />
                                </IconButton>
                            </Zoom>
                            <Zoom in={show}>
                                <Fab
                                    className={btnClass}
                                    size="small"
                                    color="primary"
                                    type="submit"
                                >
                                    <SaveIcon fontSize="small" />
                                </Fab>
                            </Zoom>
                        </Grid>
                    </Grid>
                </form>
            )}
        />
    );
};

export default TitleEditForm;
