import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { projectGet } from "../../../store/actions/index.action";

import Loader from "../../../components/Loader/Loader";
import ProjectCardList from "../../../components/Project/ProjectCardList";
import DateFormat from "../../../components/DateFormat";

const ProjectViewIndex = ({
    match: { params },
    $projectGet,
    _currentProject
}) => {
    useEffect(() => {
        $projectGet(params.projectId);
    }, [params.projectId]);

    if (!_currentProject) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="h5">
                        {_currentProject.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        gutterBottom
                    >
                        {_currentProject.description}
                    </Typography>
                    <DateFormat
                        date={_currentProject.updatedAt}
                        prefix="updated"
                        paragraph
                    />
                </Grid>
                <Grid item>
                    <Button size="small" variant="contained" color="primary">
                        <AddIcon />
                        Add Card
                    </Button>
                </Grid>
            </Grid>
            <ProjectCardList items={_currentProject.columns} />
        </Fragment>
    );
};

const mapStateToProps = ({ project }) => ({
    _currentProject: project.current
});

const mapDispatchToProps = dispatchEvent => ({
    $projectGet: projectId => dispatchEvent(projectGet(projectId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectViewIndex);
