import React, { Fragment } from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import ProjectAddForm from "./project.add.form";

const initialValues = { title: "", description: "" };

const styles = ({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/projects/list" {...props} />;

const ProjectAdd = ({ classes, $issueAdd }) => {
    const onSubmit = values => console.log(values);

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
            <ProjectAddForm onSubmit={onSubmit} initialValues={initialValues} />
        </Fragment>
    );
};

export default withStyles(styles)(ProjectAdd);
