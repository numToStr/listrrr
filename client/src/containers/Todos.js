import React, { Component, Fragment } from "react";
import { Button, withStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import TodoForm from "../components/Forms/Todo";

const styles = theme => ({
	addButton: {
		position: "absolute",
		right: "1rem",
		bottom: "1rem"
	}
});

class Todos extends Component {
	state = {
		openTodoDialog: false
	};

	onTodo = values => {
		console.log(values);
	};

	handleOpen = () => {
		this.setState({
			openTodoDialog: true
		});
	};

	handleClose = () => {
		this.setState({
			openTodoDialog: false
		});
	};

	render() {
		const {
			onTodo,
			handleOpen,
			handleClose,
			state: { openTodoDialog },
			props: { classes }
		} = this;

		return (
			<Fragment>
				<Button
					mini
					variant="fab"
					color="primary"
					classes={{
						root: classes.addButton
					}}
					onClick={handleOpen}
				>
					<Add />
				</Button>
				<TodoForm
					open={openTodoDialog}
					handleClose={handleClose}
					onSubmit={onTodo}
				/>
			</Fragment>
		);
	}
}

export default withStyles(styles)(Todos);
