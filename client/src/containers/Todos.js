import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, withStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import TodoForm from "../components/Forms/Todo";
import Header from "../components/Header";

import { onAddTodo } from "../Store/actions/index";

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
		const {
			addTodo,
			user: { _id: author }
		} = this.props;
		addTodo({ ...values, author });
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
				<Header />
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

const mapDispatchToProps = dispatch => {
	return {
		addTodo: d => dispatch(onAddTodo(d))
	};
};

const mapStateToProps = state => {
	return {
		user: state.user.user
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Todos));
