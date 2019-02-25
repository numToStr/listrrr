import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import Loader from "../../../components/loader/loader.page";
import Header from "../../../components/header/header";
import { projectList } from "../../../store/actions/index.action";

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
            <Header title="Projects" addLink="/d/projects/add" />
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
