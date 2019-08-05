import React, { memo, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditTwoTone";

import TitleEditForm from "../../../components/Form/FormTitle";

const IssueViewTitle = ({ title }) => {
    const [editField, setEditField] = useState(false);

    if (editField) {
        return (
            <TitleEditForm
                show={editField}
                initialValues={{ title }}
                onCancel={() => setEditField(false)}
                onSubmit={values => console.log(values)}
            />
        );
    }

    return (
        <Grid container justify="space-between" alignItems="center">
            <Grid item>
                <Zoom in={!editField}>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                </Zoom>
            </Grid>
            <Grid item>
                <Zoom in={!editField}>
                    <IconButton onClick={() => setEditField(true)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Zoom>
            </Grid>
        </Grid>
    );
};

export default memo(IssueViewTitle);
