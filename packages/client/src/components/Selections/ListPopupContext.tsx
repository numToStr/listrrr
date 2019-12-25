import React, { FC } from "react";
import FormikForm from "../Form/FormikForm";

type Props = {
    initialValues: string[];
    onClose(values: string[]): void;
};

const ListPopupContext: FC<Props> = ({ children, initialValues, onClose }) => {
    return (
        <FormikForm onSubmit={onClose} initialValues={{ list: initialValues }}>
            {children}
        </FormikForm>
    );
};

export default ListPopupContext;
