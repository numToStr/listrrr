import React, { Component } from "react";
import { connect } from "react-redux";

import UserForm from "../components/Forms/User";
import { onAddUser } from "../Store/actions/index";

class Home extends Component {
	onSubmit = values => {
		const { addUser } = this.props;

		addUser(values);
	};

	render() {
		const { onSubmit } = this;

		return <UserForm onSubmit={onSubmit} />;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addUser: val => dispatch(onAddUser(val))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Home);
