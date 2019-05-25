import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import BaseEditForm from "../../../components/Base/BaseEditForm";
import BaseEditDrawer from "../../../components/Base/BaseEditDrawer";
import IconEdit from "../../../components/Icons/IconEdit";

import { issueUpdate } from "../../../store/actions/issue.action";

const IssueEditIndex = ({
    issue: { _id, title, description },
    $issueUpdate,
    _loading
}) => {
    const [editDrawer, setEditDrawer] = useState(false);
    const handleEditDrawer = () => setEditDrawer(val => !val);

    const onSubmit = val => $issueUpdate(_id, val);

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
                        loading={_loading}
                    />
                </Fragment>
            </BaseEditDrawer>
        </Fragment>
    );
};

const mapStateToProps = ({ http: { request } }) => ({
    _loading: request.issueUpdate
});

const mapDispatchToProps = {
    $issueUpdate: issueUpdate
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueEditIndex);
