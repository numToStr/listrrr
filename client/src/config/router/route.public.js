import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const PublicRoute = ({
    _authenticated,
    path,
    component: Component,
    successRedirect,
    routes,
    location,
    ...props
}) => {
    const { from } = location.state || {
        from: { pathname: successRedirect }
    };

    return (
        <Route
            {...props}
            render={props =>
                _authenticated ? (
                    <Redirect to={from} />
                ) : (
                    <Component routes={routes} {...props} />
                )
            }
        />
    );
};

const mapStateToProps = ({ auth }) => ({
    _authenticated: auth.user ? true : false
});

export default connect(mapStateToProps)(PublicRoute);
