import React, { Fragment, useState, FC } from "react";
import { IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditTwoTone";
import BaseEditDrawer from "./Base/BaseEditDrawer";
import BaseEditForm from "./Base/BaseEditForm";
import { TitleAndDescriptionInput } from "../generated/graphql";
import { SubmitHandler } from "../@types/types";

type Props = {
    defaultValue: TitleAndDescriptionInput;
    title: string;
};

const EditDetails: FC<Props> = ({ defaultValue, title }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = (val: boolean) => () => setOpen(val);

    const handleSubmit: SubmitHandler<TitleAndDescriptionInput> = values => {
        console.log(values);
    };

    return (
        <Fragment>
            <IconButton onClick={handleOpen(true)}>
                <EditIcon fontSize="small" />
            </IconButton>
            <BaseEditDrawer open={open} onClose={handleOpen(false)}>
                <Typography variant="h6" paragraph>
                    {title}
                </Typography>
                <BaseEditForm
                    onSubmit={handleSubmit}
                    inititalValues={defaultValue}
                />
            </BaseEditDrawer>
        </Fragment>
    );
};

export default EditDetails;
