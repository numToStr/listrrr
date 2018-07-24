import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import UserForm from "../components/Forms/User";
import { onAddUser } from "../Store/actions/index";

class Home extends Component {
	onSubmit = values => {
		const { addUser } = this.props;

		addUser(values);
	};

	render() {
		const { onSubmit } = this;

		return (
			<Grid container justify="center">
				<Grid item xs={10} sm={5} md={3}>
					<UserForm onSubmit={onSubmit} />
				</Grid>
			</Grid>
		);
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
