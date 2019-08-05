import React, { useEffect, useCallback } from "react";
import { Form, Field } from "formik";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import BaseLoader from "../../../components/Base/BaseLoader";
import FormTextField from "../../../components/Form/FormFields/FormTextField";
import FormSelect from "../../../components/Form/FormFields/FormSelect";
import FormButton from "../../../components/Form/FormFields/FormButton";
import FormLayout from "../../../components/Form/FormLayout";

import { projectAdd, templateGet } from "../../../store/actions/index.action";
import { projectCreateSchema } from "../../../utils/validations/project.validation";

const initialValues = { title: "", description: "", template: "" };

const ProjectAddForm = ({
    $projectAdd,
    $templateGet,
    _templates,
    _loading
}) => {
    const $$templateGet = useCallback($templateGet);

    useEffect(() => {
        $$templateGet();
    }, [$$templateGet]);

    if (!_templates) {
        return <BaseLoader />;
    }

    return (
        <FormLayout
            key="project-add-form"
            onSubmit={$projectAdd}
            schema={projectCreateSchema}
            initialValues={initialValues}
            render={({ dirty }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Field
                                name="title"
                                label="Title"
                                type="text"
                                component={FormTextField}
                            />
                            <Field
                                name="description"
                                label="Description"
                                type="text"
                                multiline
                                rows={6}
                                rowsMax={10}
                                component={FormTextField}
                            />
                            <Grid container justify="flex-end">
                                <FormButton
                                    loading={_loading}
                                    disabled={!dirty || _loading}
                                    fullWidth={false}
                                >
                                    Submit
                                </FormButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="template"
                                type="text"
                                label="Project Template"
                                component={FormSelect}
                                options={_templates}
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        />
    );
};

const mapStateToProps = ({ http: { request }, templates }) => ({
    _loading: request.projectAdd,
    _templates: templates
});

const mapDispatchToProps = {
    $projectAdd: projectAdd,
    $templateGet: templateGet
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectAddForm);
