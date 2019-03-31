import React from "react";

const ProjectViewIndex = ({ match: { params } }) => {
    return <div>{params.projectId}</div>;
};

export default ProjectViewIndex;
