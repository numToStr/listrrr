import React, { useEffect, Fragment, useCallback } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import AddIcon from "@material-ui/icons/Add";

import {
    projectGet,
    projectClear,
    projectColumnRearrangeUpdate,
    projectColumnRearrange,
    projectIssueRearrange,
    projectIssueRearrangeUpdate
} from "../../../store/actions/index.action";
import { projectIssuesSelector } from "../../../store/selectors/project.selector";

import Loader from "../../../components/Loader/Loader";
import ProjectColumnList from "../../../components/Project/ProjectColumnList";
import DateFormat from "../../../components/DateFormat";
import DroppableWrapper from "../../../components/DragAndDrop/DroppableWrapper";
import DropContext from "../../../components/DragAndDrop/DropContext";
import HeaderBackButton from "../../../components/Header/HeaderBackButton";
import ProjectEditIndex from "../ProjectEdit/ProjectEditIndex";

const ProjectViewIndex = ({
    match: { params },
    $projectGet,
    $projectClear,
    $projectColumnRearrange,
    $projectColumnRearrangeUpdate,
    $projectIssueRearrange,
    $projectIssueRearrangeUpdate,
    _currentProject,
    _currentIssues
}) => {
    const $$projectGet = useCallback(() => {
        $projectGet(params.projectId);
    }, [$projectGet, params.projectId]);

    const $$projectClear = useCallback($projectClear);

    useEffect(() => {
        $$projectGet();

        // Clearing the currently loaded project
        return $$projectClear;
    }, [$$projectGet, $$projectClear]);

    if (!_currentProject) {
        return <Loader />;
    }

    const onDragEnd = data => {
        const { type, draggableId, source, destination } = data;

        /**
         * Cases ============
         *
         * For Column :-
         * 1. doesn't changed place
         * 2. changed place
         *
         * For Issue :-
         * 1. doesn't changed place
         * 2. changed place in the same column
         * 3. column changed with same index
         * 4. column changed with different index
         */

        // If there is no destination or item is dropped outside of drop context
        if (!destination) {
            return;
        }

        // If column is dragged
        const isColumn = type === "PROJECT_COLUMN";
        if (isColumn && source.index !== destination.index) {
            // This action is to update the UI
            $projectColumnRearrange(
                draggableId,
                source.index,
                destination.index
            );
            // This action is the http request to update database
            return $projectColumnRearrangeUpdate(
                params.projectId,
                draggableId,
                source.index,
                destination.index
            );
        }

        // If issue is dragged
        const isIssue = type === "PROJECT_ISSUE";
        if (isIssue) {
            // draggableId : id of the issue
            // source.droppableId: source column id
            // source.index: index of issue in the source column
            // destination.droppableId: destination column id
            // destination.index: index (to be) of issue in the destination column
            $projectIssueRearrange(
                draggableId,
                source.droppableId,
                source.index,
                destination.droppableId,
                destination.index
            );
            return $projectIssueRearrangeUpdate(
                params.projectId,
                draggableId,
                source.droppableId,
                source.index,
                destination.droppableId,
                destination.index
            );
        }
    };

    return (
        <Fragment>
            <HeaderBackButton to="/d/projects/list" />
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
                        updated
                        mb={3}
                    />
                </Grid>
                <Grid item>
                    <ProjectEditIndex />
                    {/* <Button size="small" variant="contained" color="primary">
                        <AddIcon />
                        Add Card
                    </Button> */}
                </Grid>
            </Grid>
            <DropContext onDragEnd={onDragEnd}>
                <DroppableWrapper
                    id="project-column"
                    direction="horizontal"
                    type="PROJECT_COLUMN"
                >
                    <ProjectColumnList
                        columns={_currentProject.columns}
                        issues={_currentIssues}
                    />
                </DroppableWrapper>
            </DropContext>
        </Fragment>
    );
};

const mapStateToProps = ({ project: { current } }) => ({
    _currentProject: current,
    _currentIssues: projectIssuesSelector(current)
});

const mapDispatchToProps = {
    $projectGet: projectGet,
    $projectClear: projectClear,
    $projectColumnRearrange: projectColumnRearrange,
    $projectColumnRearrangeUpdate: projectColumnRearrangeUpdate,
    $projectIssueRearrange: projectIssueRearrange,
    $projectIssueRearrangeUpdate: projectIssueRearrangeUpdate
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectViewIndex);
