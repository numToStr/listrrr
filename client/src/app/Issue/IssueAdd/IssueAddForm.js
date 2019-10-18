import React, { useEffect, useCallback } from "react";
import { Field, Form } from "formik";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import InputField from "../../../components/Form/FormFields/FormTextField";
import SelectField from "../../../components/Form/FormFields/FormSelect";
import FormButton from "../../../components/Form/FormFields/FormButton";
import FormLayout from "../../../components/Form/FormLayout";
import BaseLoader from "../../../components/Base/BaseLoader";

import { projectList } from "../../../store/actions/index.action";
import { issueCreateSchema } from "../../../utils/validations/issue.validation";

const initialValues = { title: "", description: "", project: "" };

const IssueAddForm = ({ $projectList, _projectList, onSubmit }) => {
    const $$projectList = useCallback($projectList);

    useEffect(() => {
        $$projectList();
    }, [$$projectList]);

    if (!_projectList) {
        return <BaseLoader />;
    }

    return (
        <FormLayout
            key="issue-add-form"
            onSubmit={onSubmit}
            schema={issueCreateSchema}
            initialValues={initialValues}
            render={({ dirty, isSubmitting }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Field
                                name="title"
                                label="Title"
                                type="text"
                                component={InputField}
                            />
                            <Field
                                name="description"
                                label="Description"
                                type="text"
                                multiline
                                rows={6}
                                rowsMax={10}
                                component={InputField}
                            />
                            <Grid container justify="flex-end">
                                <FormButton
                                    loading={isSubmitting}
                                    disabled={!dirty || isSubmitting}
                                    fullWidth={false}
                                >
                                    Submit
                                </FormButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="project"
                                type="text"
                                label="Add to project"
                                component={SelectField}
                                options={_projectList}
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        />
    );
};

const mapStateToProps = ({ project }) => ({
    _projectList: project.list
});

const mapDispatchToProps = {
    $projectList: projectList
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueAddForm);
