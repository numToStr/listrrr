import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Header from "../components/Header";
import Todos from "../containers/Todos";
import { onLogout } from "../Store/actions/index";

class TodosView extends Component {
	render() {
		const {
			props: { logout }
		} = this;

		return (
			<Fragment>
				<Header onLogout={logout} />
				<Todos />
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(onLogout())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(TodosView);
