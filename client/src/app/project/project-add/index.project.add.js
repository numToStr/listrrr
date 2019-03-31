import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import Loader from "../../../components/Loader/Loader";
import ProjectAddForm from "./project.add.form";
import { templateGet, projectAdd } from "../../../store/actions/index.action";

const initialValues = { title: "", description: "", template: "" };

const styles = ({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/projects/list" {...props} />;

const ProjectAdd = ({ classes, $projectAdd, $templateGet, _templates }) => {
    useEffect(() => {
        $templateGet();
    }, []);

    if (!_templates) {
        return <Loader />;
    }

    const onSubmit = values => $projectAdd(values);

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
            <ProjectAddForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                templates={_templates}
            />
        </Fragment>
    );
};

const mapStateToProps = ({ templates }) => ({
    _templates: templates
});

const mapDispatchToProps = dispatchEvent => ({
    $projectAdd: values => dispatchEvent(projectAdd(values)),
    $templateGet: () => dispatchEvent(templateGet())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProjectAdd));
