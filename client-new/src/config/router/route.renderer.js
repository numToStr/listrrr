import React from "react";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import PrivateRoute from "./route.private";
import PublicRoute from "./route.public";

const RouteRenderer = ({ config, default: redirectDefault }) => {
    const _routes = config.map(
        ({ private: pvt, path, component, ...props }) => {
            return pvt ? (
                <PrivateRoute
                    key={path}
                    path={path}
                    component={component}
                    {...props}
                />
            ) : (
                <PublicRoute
                    key={path}
                    path={path}
                    component={component}
                    {...props}
                />
            );
        }
    );

    return (
        <Switch>
            {_routes}
            {redirectDefault && <Redirect to={redirectDefault} />}
        </Switch>
    );
};

export default RouteRenderer;
