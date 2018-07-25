import { TODO_START, TODO_SUCCESS, TODO_FAIL } from "./actionTypes";
import axios from "axios";

const todoStart = () => ({ type: TODO_START });

const todoSuccess = todos => ({ type: TODO_SUCCESS, todos });

const todoFail = error => ({ type: TODO_FAIL, error });

const _todos = [];
export const onAddTodo = data => {
	return dispatch => {
		dispatch(todoStart());
		axios
			.post("/api/todo", data)
			.then(({ data: { todo } }) => {
				_todos.push(todo);
				dispatch(todoSuccess(_todos));
			})
			.catch(error => {
				dispatch(todoFail(error));
			});
	};
};
