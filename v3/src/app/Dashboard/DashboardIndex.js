import React from "react";

import Layout from "../../components/Layout/Layout";
import RoutesRenderer from "../../config/router/route.renderer";

const DashboardIndex = ({ routes }) => {
    return (
        <Layout>
            <RoutesRenderer config={routes} default="/d/home" />
        </Layout>
    );
};

export default DashboardIndex;
