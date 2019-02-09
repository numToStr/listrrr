import React, { Component } from "react";
import { Form, Field, reduxForm, reset } from "redux-form";
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl
} from "@material-ui/core";
import {
	AccessTimeRounded as TimeIcon,
	DateRangeRounded as DateIcon,
	KeyboardArrowLeftRounded as LeftArrow,
	KeyboardArrowRightRounded as RightArrow
} from "@material-ui/icons";
import { DateTimePicker } from "material-ui-pickers";

import validate from "./config/validate";

class Todo extends Component {
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

	datePicker = ({ input, meta: { error, touched }, ...field }) => {
		return (
			<FormControl margin="normal" fullWidth>
				<DateTimePicker
					dateRangeIcon={<DateIcon />}
					timeIcon={<TimeIcon />}
					leftArrowIcon={<LeftArrow />}
					rightArrowIcon={<RightArrow />}
					{...input}
					{...field}
				/>
			</FormControl>
		);
	};

	render() {
		const {
			inputField,
			datePicker,
			props: { handleSubmit, pristine, open, handleClose, title }
		} = this;

		return (
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{title}</DialogTitle>
				<Form onSubmit={handleSubmit} noValidate>
					<DialogContent
						style={{
							paddingTop: 0
						}}
					>
						<Field
							name="title"
							type="text"
							placeholder="Your todo title"
							label="Title"
							component={inputField}
						/>
						<Field
							name="description"
							type="text"
							placeholder="Your todo description"
							label="Description"
							component={inputField}
						/>
						<Field
							name="reminder"
							label="Reminder"
							autoSubmit={false}
							component={datePicker}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							type="submit"
							disabled={pristine}
							variant="raised"
							color="primary"
						>
							Submit
						</Button>
					</DialogActions>
				</Form>
			</Dialog>
		);
	}
}

Todo = reduxForm({
	form: "Todo",
	validate,
	onSubmitSuccess: (result, dispatch) => {
		dispatch(reset("Todo"));
	},
	enableReinitialize: true
})(Todo);

export default Todo;
