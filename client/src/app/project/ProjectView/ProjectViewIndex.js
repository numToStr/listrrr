import React, { useEffect } from "react";
import { connect } from "react-redux";

import Loader from "../../../components/loader/loader.page";
import { projectGet } from "../../../store/actions/index.action";

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

    return <div>{_currentProject._id}</div>;
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
