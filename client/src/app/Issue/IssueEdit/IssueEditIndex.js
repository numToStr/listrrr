import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import BaseEditForm from "../../../components/Base/BaseEditForm";
import BaseEditDrawer from "../../../components/Base/BaseEditDrawer";
import IconEdit from "../../../components/Icons/IconEdit";
import { issueUpdate } from "../../../store/requests/issue.request";
import { issueUpdateSuccess } from "../../../store/actions/issue.action";

const IssueEditIndex = ({
    issue: { _id, title, description },
    $issueUpdateSuccess
}) => {
    const [editDrawer, setEditDrawer] = useState(false);
    const handleEditDrawer = () => setEditDrawer(val => !val);

    const onSubmit = async val => {
        const data = await issueUpdate(_id, val);

        $issueUpdateSuccess(data);

        handleEditDrawer();
    };

    const initValues = { title, description };
    return (
        <Fragment>
            <IconButton onClick={handleEditDrawer}>
                <IconEdit />
            </IconButton>
            <BaseEditDrawer open={editDrawer} onClose={handleEditDrawer}>
                <Fragment>
                    <Typography gutterBottom variant="h6">
                        Edit Issue
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

const mapDispatchToProps = {
    $issueUpdateSuccess: issueUpdateSuccess
};

export default connect(
    null,
    mapDispatchToProps
)(IssueEditIndex);
