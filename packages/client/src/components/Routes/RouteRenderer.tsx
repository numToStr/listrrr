import React, { FC } from "react";
import { RoutesConfig } from "../../config/routes.config";
import { Switch, Route } from "react-router-dom";

type Props = {
    routes: RoutesConfig[];
};

export const RouteRenderer: FC<Props> = ({ routes }) => {
    const allRoutes = routes.map(({ path, component: C, routes, ...props }) => (
        <Route key={path} path={path} {...props}>
            <C routes={routes} />
        </Route>
    ));

    return <Switch>{allRoutes}</Switch>;
};
