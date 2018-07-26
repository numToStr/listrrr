import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Public from "./config/PublicRoute";
import Private from "./config/PrivateRoute";

import { Home, Todos } from "./config/AsyncRoutes";

import { authAutoSignIn } from "../../Store/actions/index";
import Loader from "../../components/Loader";

class Router extends Component {
	state = {
		stay: true
	};

	componentDidMount() {
		const { autoSignIn } = this.props;

		autoSignIn(() => {
			this.setState({
				stay: false
			});
		});
	}

	render() {
		const {
			state: { stay },
			props: { isAuth }
		} = this;

		if (stay) {
			return <Loader />;
		}

		return (
			<Switch>
				<Private isAuth={isAuth} path="/todos" component={Todos} />
				<Public exact isAuth={isAuth} path="/" component={Home} />
			</Switch>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	autoSignIn: cb => dispatch(authAutoSignIn(cb))
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
