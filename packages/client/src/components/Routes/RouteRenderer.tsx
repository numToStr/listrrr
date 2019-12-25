import React, { FC } from "react";
import { Switch, Redirect } from "react-router-dom";
import { Routes } from "../../config/routes.config";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import BaseLoader from "../Base/BaseLoader";
import { useIsLoggedIn } from "../../gql/auth.query";

type Props = {
    routes: Routes;
    defaultRedirect?: string;
};

const RouteRenderer: FC<Props> = ({ routes, defaultRedirect: redirect }) => {
    const { loading, data } = useIsLoggedIn();

    if (loading && !data) {
        return <BaseLoader />;
    }

    const authorized = !!data?.isLoggedIn;

    const allRoutes = routes.map(route => {
        return route.private ? (
            <PrivateRoute key={route.path} authorized={authorized} {...route} />
        ) : (
            <PublicRoute key={route.path} authorized={authorized} {...route} />
        );
    });

    return (
        <Switch>
            {allRoutes}
            {!!redirect && <Redirect to={redirect} />}
        </Switch>
    );
};

export default RouteRenderer;
