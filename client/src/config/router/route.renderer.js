import React from "react";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import PrivateRoute from "./route.private";
import PublicRoute from "./route.public";

import { redirects } from "./route.config";

const WhichRoute = ({ private: pvt, path, component, ...props }) => {
    return pvt ? (
        <PrivateRoute
            path={path}
            component={component}
            failureRedirect={redirects.authFailure}
            {...props}
        />
    ) : (
        <PublicRoute
            path={path}
            component={component}
            successRedirect={redirects.authSuccess}
            {...props}
        />
    );
};

const RouteRenderer = ({ config, default: redirectDefault }) => {
    const _routes = config.map(
        ({ private: pvt, path, component, ...route }) => {
            return (
                <WhichRoute
                    key={path}
                    private={pvt}
                    path={path}
                    component={component}
                    {...route}
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
