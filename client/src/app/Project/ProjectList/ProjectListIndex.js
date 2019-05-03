import React, { Fragment, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import Loader from "../../../components/Loader/Loader";
import Header from "../../../components/Header/Header";
import ProjectList from "../../../components/Project/ProjectList";
import Subheader from "../../../components/Header/Subheader";

import { projectList } from "../../../store/actions/index.action";

const ProjectListIndex = ({ $projectList, _projectList }) => {
    const $$projectList = useCallback($projectList);

    useEffect(() => {
        $$projectList();
    }, [$$projectList]);

    if (!_projectList) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Header title="Projects" addLink="/d/projects/add" />
            <Subheader />
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
