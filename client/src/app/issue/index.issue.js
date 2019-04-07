import React from "react";

import RoutesRenderer from "../../config/router/route.renderer";

const Issue = ({ routes }) => (
    <RoutesRenderer config={routes} default="/d/issues/list" />
);

export default Issue;
