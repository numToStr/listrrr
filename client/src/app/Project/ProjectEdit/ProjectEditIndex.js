import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

import BaseEditForm from "../../../components/Base/BaseEditForm";
import BaseEditDrawer from "../../../components/Base/BaseEditDrawer";

const initValues = { title: "", description: "" };

const ProjectEditIndex = () => {
    const onSubmit = val => console.log(val);

    return (
        <Fragment>
            <BaseEditDrawer>
                <Fragment>
                    <Typography gutterBottom variant="h6">
                        Edit Project
                    </Typography>
                    <BaseEditForm
                        initialValues={initValues}
                        onSubmit={onSubmit}
                    />
                </Fragment>
            </BaseEditDrawer>
        </Fragment>
    );
};

export default ProjectEditIndex;
