import React, { Component } from "react";
import UserForm from "../components/Forms/User";
import { Grid } from "@material-ui/core";

class Home extends Component {
	onSubmit = values => {
		console.log(values);
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

export default Home;
