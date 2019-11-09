import React, { FC } from "react";
import BaseLayout from "../components/Base/BaseLayout";
import RouteRenderer from "../components/Routes/RouteRenderer";
import { Routes } from "../config/routes.config";

type Props = {
    routes?: Routes;
};

const Home: FC<Props> = ({ routes = [] }) => {
    return (
        <BaseLayout>
            <RouteRenderer routes={routes} />
        </BaseLayout>
    );
};

export default Home;
