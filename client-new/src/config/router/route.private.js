import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { redirects } from "./route.config";

const PrivateRoute = ({
    _authenticated,
    path,
    component: Component,
    routes,
    ...props
}) => {
    return (
        <Route
            path={path}
            {...props}
            render={renderProps => {
                return _authenticated ? (
                    <Component routes={routes} {...renderProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: redirects.authFailure,
                            state: {
                                from: props.location
                            }
                        }}
                    />
                );
            }}
        />
    );
};

const mapStateToProps = ({ auth }) => ({
    _authenticated: auth.user ? true : false
});

export default connect(mapStateToProps)(PrivateRoute);
