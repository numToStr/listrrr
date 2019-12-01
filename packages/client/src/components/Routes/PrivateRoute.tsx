import React, { FC } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { RoutesConfig } from "../../config/routes.config";
import ErrorBoundary from "../ErrorBoundary";

type Props = Omit<RoutesConfig, "private"> & {
    authorized: boolean;
};

const PrivateRoute: FC<Props> = props => {
    const { authorized, component: C, routes, ...route } = props;
    const { pathname } = useLocation();

    return (
        <Route {...route}>
            <ErrorBoundary>
                {authorized ? (
                    <C routes={routes} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                from: { pathname },
                            },
                        }}
                    />
                )}
            </ErrorBoundary>
        </Route>
    );
};

export default PrivateRoute;
