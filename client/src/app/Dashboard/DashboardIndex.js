import React from "react";

import BaseLayout from "../../components/Base/BaseLayout";
import RoutesRenderer from "../../config/router/route.renderer";

const DashboardIndex = ({ routes }) => {
    return (
        <BaseLayout>
            <RoutesRenderer config={routes} default="/d/home" />
        </BaseLayout>
    );
};

export default DashboardIndex;
