import React, { useState, Fragment } from "react";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditTwoTone";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
    editDrawer: {
        width: spacing(30),
        [breakpoints.up("sm")]: {
            width: spacing(45)
        },
        [breakpoints.up("md")]: {
            width: spacing(60)
        }
    }
}));

const BaseEditDrawer = ({ children }) => {
    const classes = useStyles();
    const [editDrawer, setEditDrawer] = useState(false);

    return (
        <Fragment>
            <IconButton onClick={() => setEditDrawer(true)}>
                <EditIcon fontSize="small" />
            </IconButton>
            <Drawer
                classes={{
                    paper: classes.editDrawer
                }}
                open={editDrawer}
                onClose={() => setEditDrawer(false)}
                variant="temporary"
                anchor="right"
            >
                <Box p={2}>{children}</Box>
            </Drawer>
        </Fragment>
    );
};

export default BaseEditDrawer;
