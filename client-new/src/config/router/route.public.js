import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { redirects } from "./route.config";

const PublicRoute = ({
    _authenticated,
    path,
    component: Component,
    routes,
    location,
    ...props
}) => {
    const { from } = location.state || {
        from: { pathname: redirects.authSuccess }
    };

    return (
        <Route
            {...props}
            render={renderProps =>
                _authenticated ? (
                    <Redirect to={from} />
                ) : (
                    <Component routes={routes} {...renderProps} />
                )
            }
        />
    );
};

const mapStateToProps = ({ auth }) => ({
    _authenticated: auth.user ? true : false
});

export default connect(mapStateToProps)(PublicRoute);
