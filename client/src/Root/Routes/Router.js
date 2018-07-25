import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Public from "./config/PublicRoute";
import Private from "./config/PrivateRoute";

import Home from "../../containers/Home";
import Todos from "../../containers/Todos";

import { authAutoSignIn } from "../../Store/actions/index";

class Router extends Component {
	componentDidMount() {
		const { autoSignIn } = this.props;

		autoSignIn();
	}

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

const mapDispatchToProps = dispatch => ({
	autoSignIn: () => dispatch(authAutoSignIn())
});

const mapStateToProps = state => ({
	isAuth: state.user.user ? true : false
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Router)
);
