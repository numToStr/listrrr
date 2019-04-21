import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import ProjectAddForm from "./ProjectAddForm";

const useStyles = makeStyles(({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
}));

const _Link = props => <Link to="/d/projects/list" {...props} />;

const ProjectAddIndex = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <IconButton
                        color="primary"
                        component={_Link}
                        className={classes.headerMargin}
                    >
                        <BackIcon fontSize="small" />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        New Project
                    </Typography>
                </Grid>
            </Grid>
            <ProjectAddForm />
        </Fragment>
    );
};

export default ProjectAddIndex;
