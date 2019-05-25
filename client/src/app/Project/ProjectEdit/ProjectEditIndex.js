import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import BaseEditForm from "../../../components/Base/BaseEditForm";
import BaseEditDrawer from "../../../components/Base/BaseEditDrawer";
import IconEdit from "../../../components/Icons/IconEdit";

import { projectUpdate } from "../../../store/actions/index.action";

const ProjectEditIndex = ({
    project: { _id, title, description },
    $projectUpdate,
    _loading
}) => {
    const [editDrawer, setEditDrawer] = useState(false);
    const handleEditDrawer = () => setEditDrawer(val => !val);

    const onSubmit = val => $projectUpdate(_id, val);

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
                        onSubmit={onSubmit}
                        loading={_loading}
                    />
                </Fragment>
            </BaseEditDrawer>
        </Fragment>
    );
};

const mapStateToProps = ({ http: { request } }) => ({
    _loading: request.projectUpdate
});

const mapDispatchToProps = {
    $projectUpdate: projectUpdate
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectEditIndex);
