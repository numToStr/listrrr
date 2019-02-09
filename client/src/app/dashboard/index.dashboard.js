import React from "react";
import Typography from "@material-ui/core/Typography";

import Layout from "../../components/layout/index.layout";
import RoutesRenderer from "../../config/router/route.renderer";

const Dashboard = ({ routes }) => {
    return (
        <Layout>
            <Typography variant="h4" paragraph>
                Welcome to Dashboard
            </Typography>
            <RoutesRenderer config={routes} />
        </Layout>
    );
};

export default Dashboard;
