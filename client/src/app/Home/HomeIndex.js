import React from "react";

import BaseLayout from "../../components/Base/BaseLayout";
import RoutesRenderer from "../../config/router/route.renderer";

const HomeIndex = ({ routes }) => {
    return (
        <BaseLayout>
            <RoutesRenderer config={routes} default="/d/dash" />
        </BaseLayout>
    );
};

export default HomeIndex;
