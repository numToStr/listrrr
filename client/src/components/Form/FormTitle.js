import React from "react";
import { Field, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/CheckTwoTone";
import CancelIcon from "@material-ui/icons/CloseTwoTone";

import InputField from "./FormFields/FormTextField";
import FormLayout from "./FormLayout";

const TitleEditForm = ({ show, initialValues, onCancel, onSubmit }) => {
    return (
        <FormLayout
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ dirty }) => (
                <Form>
                    <Grid container justify="space-between" alignItems="center">
                        <Zoom in={show}>
                            <Grid item>
                                <Field
                                    name="title"
                                    type="text"
                                    variant="outlined"
                                    margin="dense"
                                    component={InputField}
                                />
                            </Grid>
                        </Zoom>
                        <Grid item>
                            <Zoom in={show}>
                                <IconButton onClick={onCancel} type="reset">
                                    <CancelIcon fontSize="small" />
                                </IconButton>
                            </Zoom>
                            <Zoom in={show}>
                                <Fab
                                    size="small"
                                    color="primary"
                                    type="submit"
                                    disabled={!dirty}
                                >
                                    <SaveIcon fontSize="small" />
                                </Fab>
                            </Zoom>
                        </Grid>
                    </Grid>
                </Form>
            )}
        />
    );
};

export default TitleEditForm;
