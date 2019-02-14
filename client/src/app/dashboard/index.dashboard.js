import React from "react";

import Layout from "../../components/layout/index.layout";
import RoutesRenderer from "../../config/router/route.renderer";

const Dashboard = ({ routes }) => {
    return (
        <Layout>
            <RoutesRenderer config={routes} default="/d/home" />
        </Layout>
    );
};

export default Dashboard;
