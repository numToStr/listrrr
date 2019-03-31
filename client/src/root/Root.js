import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import withRouter from "react-router-dom/withRouter";
import { routes } from "../config/router/route.config";
import RoutesRenderer from "../config/router/route.renderer";

import Loader from "../components/Loader/Loader";
import { authenticate } from "../store/actions/index.action";

const Root = ({ $authenticate, _isAuthenticating }) => {
    const $$authenticate = useCallback($authenticate, [$authenticate]);

    useEffect(() => {
        $$authenticate();
    }, []);

    if (_isAuthenticating) {
        return <Loader />;
    }

    return <RoutesRenderer config={routes} default="/" />;
};

const mapState = ({ http: { request } }) => ({
    _isAuthenticating: request.authenticate ? true : false
});

const mapDispatch = dispatchEvent => ({
    $authenticate: () => dispatchEvent(authenticate())
});

export default withRouter(
    connect(
        mapState,
        mapDispatch
    )(Root)
);
