import React, { FC } from "react";
import { Routes } from "../../config/routes.config";
import { Switch, Route, Redirect } from "react-router-dom";

type Props = {
    routes: Routes;
    defaultRedirect?: string;
};

export const RouteRenderer: FC<Props> = ({
    routes,
    defaultRedirect: redirect
}) => {
    const allRoutes = routes.map(({ path, component: C, routes, ...props }) => (
        <Route key={path} path={path} {...props}>
            <C routes={routes} />
        </Route>
    ));

    return (
        <Switch>
            {allRoutes}
            {!!redirect && <Redirect to={redirect} />}
        </Switch>
    );
};
