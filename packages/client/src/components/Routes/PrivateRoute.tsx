import React, { FC } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { RoutesConfig } from "../../config/routes.config";

type Props = Omit<RoutesConfig, "private"> & {
    authorized: boolean;
};

const PrivateRoute: FC<Props> = props => {
    const { authorized, component: C, routes, ...route } = props;
    const { pathname } = useLocation();

    return (
        <Route {...route}>
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
        </Route>
    );
};

export default PrivateRoute;
