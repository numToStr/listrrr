import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Public from "./config/PublicRoute";
import Private from "./config/PrivateRoute";

import Home from "../../containers/Home";
import Todos from "../../containers/Todos";

class Router extends Component {
	render() {
		const {
			props: { isAuth }
		} = this;

		return (
			<Switch>
				<Private isAuth={isAuth} path="/todos" component={Todos} />
				<Public exact isAuth={isAuth} path="/" component={Home} />
			</Switch>
		);
	}
}

const mapStateToProps = state => ({
	isAuth: state.user.user ? true : false
});

export default withRouter(connect(mapStateToProps)(Router));
