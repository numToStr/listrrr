import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, withStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import TodoForm from "../components/Forms/Todo";
import Header from "../components/Header";
import TodoList from "../components/Todos/Todos";

import {
	onAddTodo,
	onLoadTodos,
	onDeleteTodo,
	onUpdateTodo
} from "../Store/actions/index";

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

	componentDidMount() {
		const { loadTodos } = this.props;
		loadTodos();
	}

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

	onCheckTodo = (id, checked) => {
		const { updateTodo } = this.props;
		updateTodo(id, { checked });
	};

	onDeleteTodo = id => () => {
		const { deleteTodo } = this.props;
		deleteTodo(id);
	};

	render() {
		const {
			onTodo,
			handleOpen,
			handleClose,
			onCheckTodo,
			onDeleteTodo,
			state: { openTodoDialog },
			props: { classes, todos }
		} = this;

		return (
			<Fragment>
				<Header />
				<TodoList
					todoList={todos}
					onCheck={onCheckTodo}
					onDelete={onDeleteTodo}
				/>
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
		addTodo: d => dispatch(onAddTodo(d)),
		loadTodos: () => dispatch(onLoadTodos()),
		deleteTodo: id => dispatch(onDeleteTodo(id)),
		updateTodo: (id, data) => dispatch(onUpdateTodo(id, data))
	};
};

const mapStateToProps = state => {
	return {
		user: state.user.user,
		todos: state.todo.todos
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Todos));
