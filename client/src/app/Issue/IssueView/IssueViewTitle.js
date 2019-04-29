import React, { memo, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditTwoTone";
import makeStyles from "@material-ui/styles/makeStyles";

import TitleEditForm from "../../../components/Form/FormTitle";

const useStyles = makeStyles(({ spacing }) => {
    return {
        titlePadding: {
            padding: `.9rem 0`
        },
        buttonMargin: {
            marginLeft: spacing(0.5)
        }
    };
});

const IssueViewTitle = ({ title }) => {
    const classes = useStyles();

    const [editField, setEditField] = useState(false);

    if (editField) {
        return (
            <TitleEditForm
                show={editField}
                btnClass={classes.buttonMargin}
                initialValues={{ title }}
                onCancel={() => setEditField(false)}
                onSubmit={values => console.log(values)}
            />
        );
    }

    return (
        <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ marginBottom: "1rem" }}
        >
            <Grid item>
                <Zoom in={!editField}>
                    <Typography variant="h5" className={classes.titlePadding}>
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
