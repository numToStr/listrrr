import React from "react";

import RoutesRenderer from "../../config/router/route.renderer";

const Project = ({ routes }) => (
    <RoutesRenderer config={routes} default="/d/projects/list" />
);

export default Project;
