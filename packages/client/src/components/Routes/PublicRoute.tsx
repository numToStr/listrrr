import React, { FC } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { RoutesConfig } from "../../config/routes.config";
import ErrorBoundary from "../ErrorBoundary";

type Props = Omit<RoutesConfig, "private"> & {
    authorized: boolean;
};

interface LocationState {
    from: { pathname: string };
}

const PublicRoute: FC<Props> = props => {
    const { authorized, component: C, routes, ...route } = props;
    const { state: lState } = useLocation<LocationState | null>();

    const from = lState?.from ?? { pathname: "/d/project" };

    return (
        <Route {...route}>
            <ErrorBoundary>
                {authorized ? <Redirect to={from} /> : <C routes={routes} />}
            </ErrorBoundary>
        </Route>
    );
};

export default PublicRoute;
