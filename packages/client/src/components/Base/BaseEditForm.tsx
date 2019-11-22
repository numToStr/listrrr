import React, { FC } from "react";
import { SubmitHandler } from "../../@types/types";
import FormikForm from "../Form/FormikForm";
import FormikTextField from "../Form/FormikTextField";
import FormikSubmitButton from "../Form/FormikSubmitButton";
import FormikTextArea from "../Form/FormikTextArea";

type Props = {
    inititalValues: {
        title: string;
        description: string;
    };
    onSubmit: SubmitHandler<any>;
};

const BaseEditForm: FC<Props> = ({ onSubmit, inititalValues }) => {
    return (
        <FormikForm onSubmit={onSubmit} initialValues={inititalValues}>
            <FormikTextField name="title" label="Title" autoFocus />
            <FormikTextArea name="description" label="Description" />
            <FormikSubmitButton>Submit</FormikSubmitButton>
        </FormikForm>
    );
};

export default BaseEditForm;
