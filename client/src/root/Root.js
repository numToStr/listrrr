import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "react-router-dom/withRouter";
import { routes } from "../config/router/route.config";
import RoutesRenderer from "../config/router/route.renderer";

import LoadingPage from "../components/loader/loader.page";
import { authenticate } from "../store/actions/index.action";

class index extends Component {
    componentDidMount = () => {
        this.props.$authenticate();
    };

    render() {
        const { _isAuthenticating } = this.props;

        if (_isAuthenticating) {
            return <LoadingPage />;
        }

        return <RoutesRenderer config={routes} default="/" />;
    }
}

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
    )(index)
);
