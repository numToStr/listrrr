import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import Loader from "../../../components/loader/loader.page";
import { projectList } from "../../../store/actions/index.action";

const styles = ({ spacing }) => ({
    addIcon: {
        marginRight: spacing.unit / 2.5
    }
});

const _Link = props => <Link to="/d/projects/add" {...props} />;

const ProjectListIndex = ({ classes, $projectList, _projectList }) => {
    useEffect(() => {
        $projectList();
    }, []);

    if (!_projectList) {
        return <Loader />;
    }
    console.log(_projectList);

    return (
        <Fragment>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">Projects</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component={_Link}
                    >
                        <AddIcon className={classes.addIcon} />
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};

const mapStateToProps = ({ project }) => ({
    _projectList: project.list
});

const mapDispatchToProps = dispatchEvent => ({
    $projectList: () => dispatchEvent(projectList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProjectListIndex));
