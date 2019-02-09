import {
	TODO_START,
	TODO_SUCCESS,
	TODO_FAIL,
	TODO_DELETE,
	TODO_UPDATE
} from "./actionTypes";
import axios from "axios";

const todoStart = () => ({ type: TODO_START });

const todoSuccess = todos => ({ type: TODO_SUCCESS, todos });

const todoFail = error => ({ type: TODO_FAIL, error });

const todoDelete = _id => ({ type: TODO_DELETE, _id });

const todoUpdate = (_id, todo) => ({ type: TODO_UPDATE, _id, todo });

let _todos = [];
export const onAddTodo = data => {
	return dispatch => {
		dispatch(todoStart());
		axios
			.post("/api/todo", data)
			.then(({ data: { todo } }) => {
				_todos.unshift(todo);
				dispatch(todoSuccess(_todos));
			})
			.catch(error => {
				dispatch(todoFail(error));
			});
	};
};

export const onDeleteTodo = todoId => {
	return dispatch => {
		dispatch(todoStart());
		axios
			.delete(`/api/todo/${todoId}`)
			.then(data => {
				dispatch(todoDelete(todoId));
			})
			.catch(error => {
				dispatch(todoFail(error));
			});
	};
};

export const onUpdateTodo = (todoId, data) => {
	return dispatch => {
		dispatch(todoStart());
		axios
			.patch(`/api/todo/${todoId}`, data)
			.then(({ data: { todo } }) => {
				dispatch(todoUpdate(todoId, todo));
			})
			.catch(error => {
				dispatch(todoFail(error));
			});
	};
};

export const onLoadTodos = () => {
	return dispatch => {
		dispatch(todoStart());
		axios
			.get("/api/todo")
			.then(({ data: { todos } }) => {
				_todos = todos;
				dispatch(todoSuccess(_todos));
			})
			.catch(error => {
				dispatch(todoFail(error));
			});
	};
};
