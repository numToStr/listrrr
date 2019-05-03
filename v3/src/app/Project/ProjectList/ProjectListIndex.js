import React, { Fragment, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import Loader from "../../../components/Loader/Loader";
import Header from "../../../components/Header/Header";
import { projectList } from "../../../store/actions/index.action";
import ProjectList from "../../../components/Project/ProjectList";

const ProjectListIndex = ({ $projectList, _projectList }) => {
    const $$projectList = useCallback($projectList, []);

    useEffect(() => {
        $$projectList();
    }, [$$projectList]);

    if (!_projectList) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Header title="Projects" addLink="/d/projects/add" />
            <ProjectList items={_projectList} />
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
)(ProjectListIndex);
