import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";
import { TextField, Button, FormControl } from "@material-ui/core";

import validate from "./config/validate";

class User extends Component {
	inputField = ({ input, meta: { error, touched }, ...field }) => {
		return (
			<TextField
				{...input}
				{...field}
				margin="normal"
				error={touched && error ? true : false}
				helperText={touched && error ? error : field.helperText}
				InputLabelProps={{
					shrink: true
				}}
				fullWidth
			/>
		);
	};

	render() {
		const {
			inputField,
			props: { handleSubmit, pristine }
		} = this;

		return (
			<Form onSubmit={handleSubmit} noValidate>
				<Field
					name="email"
					type="email"
					placeholder="Enter your email"
					label="Email"
					helperText="Will be used to save your todos"
					component={inputField}
				/>
				<FormControl margin="normal" fullWidth>
					<Button
						type="submit"
						disabled={pristine}
						variant="raised"
						color="primary"
						fullWidth
					>
						Submit
					</Button>
				</FormControl>
			</Form>
		);
	}
}

User = reduxForm({
	form: "User",
	validate
})(User);

export default User;
