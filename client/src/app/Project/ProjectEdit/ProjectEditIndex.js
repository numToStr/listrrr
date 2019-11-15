import React, { Fragment, useState, useCallback } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import BaseEditForm from "../../../components/Base/BaseEditForm";
import BaseEditDrawer from "../../../components/Base/BaseEditDrawer";
import IconEdit from "../../../components/Icons/IconEdit";
import { projectUpdate } from "../../../store/requests/project.request";
import { projectUpdateSuccess } from "../../../store/actions/project.action";

const ProjectEditIndex = ({
    project: { _id, title, description },
    $projectUpdateSuccess
}) => {
    const [editDrawer, setEditDrawer] = useState(false);
    const handleEditDrawer = () => setEditDrawer(val => !val);

    const handleSubmit = useCallback(async values => {
        const data = await projectUpdate(_id, values);

        handleEditDrawer();

        $projectUpdateSuccess(data);
    }, [$projectUpdateSuccess, _id]);

    const initValues = { title, description };
    return (
        <Fragment>
            <IconButton onClick={handleEditDrawer}>
                <IconEdit />
            </IconButton>
            <BaseEditDrawer open={editDrawer} onClose={handleEditDrawer}>
                <Fragment>
                    <Typography gutterBottom variant="h6">
                        Edit Project
                    </Typography>
                    <BaseEditForm
                        initialValues={initValues}
                        onSubmit={handleSubmit}
                    />
                </Fragment>
            </BaseEditDrawer>
        </Fragment>
    );
};

const mapDispatchToProps = {
    $projectUpdateSuccess: projectUpdateSuccess
};

export default connect(
    null,
    mapDispatchToProps
)(ProjectEditIndex);
