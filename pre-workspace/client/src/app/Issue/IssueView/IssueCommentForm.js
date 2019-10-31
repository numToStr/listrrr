import React from "react";
import { Form, Field } from "formik";
import Box from "@material-ui/core/Box";

import FormLayout from "../../../components/Form/FormLayout";
import InputField from "../../../components/Form/FormFields/FormTextField";
import FormButton from "../../../components/Form/FormFields/FormButton";

import { commentSchema } from "../../../utils/validations/issue.validation";

const initialValues = { comment: "" };

const IssueCommentForm = ({ onSubmit, onClose, isOpen }) => {
    return (
        <FormLayout
            key="issue-comment-form"
            onSubmit={onSubmit}
            schema={commentSchema}
            initialValues={initialValues}
            render={({ dirty }) => (
                <Form>
                    <Field
                        name="comment"
                        label="Comment"
                        placeholder="Leave a comment"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        component={InputField}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <FormButton
                            type="reset"
                            variant="outlined"
                            fullWidth={false}
                            onClick={onClose}
                        >
                            {isOpen ? "Close Issue" : "Open Issue"}
                        </FormButton>
                        <Box mr={1} />
                        <FormButton
                            type="submit"
                            disabled={!dirty}
                            fullWidth={false}
                        >
                            Comment
                        </FormButton>
                    </Box>
                </Form>
            )}
        />
    );
};

export default IssueCommentForm;
