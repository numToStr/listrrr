import React from "react";

import RoutesRenderer from "../../config/router/route.renderer";

const ProjectIndex = ({ routes }) => (
    <RoutesRenderer config={routes} default="/d/projects/list" />
);

export default ProjectIndex;
