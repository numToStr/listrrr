import React, { FC } from "react";
import FormikForm from "../Form/FormikForm";
import { SubmitHandler } from "../../@types/types";

type Props = {
    initialValues: string[];
    onClose: SubmitHandler<{ list: string[] }>;
};

const ListPopupContext: FC<Props> = ({ children, initialValues, onClose }) => {
    return (
        <FormikForm onSubmit={onClose} initialValues={{ list: initialValues }}>
            {children}
        </FormikForm>
    );
};

export default ListPopupContext;
