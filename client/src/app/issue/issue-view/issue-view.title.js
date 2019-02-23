import React, { Fragment, memo, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import EditIcon from "@material-ui/icons/EditTwoTone";
import SaveIcon from "@material-ui/icons/CheckTwoTone";
import CancelIcon from "@material-ui/icons/CloseTwoTone";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ({ spacing }) => {
    return {
        titlePadding: {
            padding: `.9rem 0`
        },
        buttonMargin: {
            marginLeft: spacing.unit / 2
        }
    };
};

const IssueViewTitle = ({ classes, title }) => {
    const [editField, setEditField] = useState(false);

    if (editField) {
        return (
            <Fragment>
                <Grid item>
                    {/* === Don't remove this div. Otherwise animation won't work. IDK why? */}
                    <div />
                    {/* === end === */}
                    <Zoom in={editField}>
                        <TextField
                            fullWidth
                            name="title"
                            value={title}
                            variant="outlined"
                            margin="dense"
                        />
                    </Zoom>
                </Grid>
                <Grid item>
                    {/* === Don't remove this div. Otherwise animation won't work. IDK why? */}
                    <div />
                    {/* === end === */}
                    <Zoom in={editField}>
                        <IconButton
                            className={classes.buttonMargin}
                            onClick={() => setEditField(false)}
                        >
                            <CancelIcon fontSize="small" />
                        </IconButton>
                    </Zoom>
                    <Zoom in={editField}>
                        <Fab
                            className={classes.buttonMargin}
                            size="small"
                            color="primary"
                        >
                            <SaveIcon fontSize="small" />
                        </Fab>
                    </Zoom>
                </Grid>
            </Fragment>
        );
    }

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default memo(withStyles(styles)(IssueViewTitle));
