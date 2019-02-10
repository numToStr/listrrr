import React, { Fragment } from "react";

import RoutesRenderer from "../../config/router/route.renderer";

const LiveQuiz = ({ routes }) => {
    return (
        <Fragment>
            <RoutesRenderer config={routes} default="/d/issues/list" />
        </Fragment>
    );
};

export default LiveQuiz;
