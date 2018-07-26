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
		position: "fixed",
		right: "1rem",
		bottom: "1rem"
	}
});

class Todos extends Component {
	state = {
		formTitle: "",
		openTodoDialog: false,
		currentTodo: null
	};

	componentDidMount() {
		const {
			loadTodos,
			user: { _id }
		} = this.props;

		loadTodos(_id);
	}

	onAddTodo = values => {
		const {
			props: {
				addTodo,
				user: { _id: author }
			},
			handleClose
		} = this;

		addTodo({ ...values, author });
		handleClose();
	};

	handleOpen = _id => () => {
		const { todos } = this.props;

		const _current = todos.filter(todo => todo._id === _id)[0] || {
			reminder: new Date()
		};

		this.setState({
			formTitle: _id ? "Edit Todo" : "Add Todo",
			openTodoDialog: true,
			currentTodo: _current
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

	onEditTodo = values => {
		const {
			handleClose,
			props: { updateTodo }
		} = this;

		updateTodo(values._id, values);
		handleClose();
	};

	render() {
		const {
			onAddTodo,
			handleOpen,
			handleClose,
			onCheckTodo,
			onDeleteTodo,
			onEditTodo,
			state: { openTodoDialog, formTitle, currentTodo },
			props: { classes, todos }
		} = this;

		return (
			<Fragment>
				<Header />
				<TodoList
					todoList={todos}
					onCheck={onCheckTodo}
					onDelete={onDeleteTodo}
					onEdit={handleOpen}
				/>
				<Button
					mini
					variant="fab"
					color="primary"
					classes={{
						root: classes.addButton
					}}
					onClick={handleOpen(null)}
				>
					<Add />
				</Button>
				<TodoForm
					title={formTitle}
					open={openTodoDialog}
					handleClose={handleClose}
					onSubmit={
						formTitle === "Edit Todo" ? onEditTodo : onAddTodo
					}
					initialValues={currentTodo}
				/>
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addTodo: d => dispatch(onAddTodo(d)),
		loadTodos: id => dispatch(onLoadTodos(id)),
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
