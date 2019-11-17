import React, { FC } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { RoutesConfig } from "../../config/routes.config";

type Props = Omit<RoutesConfig, "private"> & {
    authorized: boolean;
};

const PublicRoute: FC<Props> = props => {
    const { authorized, component: C, routes, ...route } = props;
    const { state: lState } = useLocation();

    const { from } = lState || {
        from: { pathname: "/d/project" },
    };

    return (
        <Route {...route}>
            {authorized ? <Redirect to={from} /> : <C routes={routes} />}
        </Route>
    );
};

export default PublicRoute;
