import {
	TODO_START,
	TODO_SUCCESS,
	TODO_FAIL,
	TODO_DELETE,
	TODO_UPDATE,
	USER_LOGOUT
} from "../actions/actionTypes";

const initState = {
	todos: [],
	loading: false,
	error: null
};

const todoStart = (state, action) => ({
	...state,
	loading: true,
	error: null
});

const todoSuccess = (state, { todos }) => {
	return {
		...state,
		/* not using spread will not triggering render() [idk why] */
		todos: [...todos],
		loading: false,
		error: null
	};
};

const todoFail = (state, { error }) => ({
	...state,
	loading: false,
	error
});

const todoDelete = (state, { _id }) => {
	const _todos = state.todos.filter(todo => {
		return todo._id !== _id;
	});

	return {
		...state,
		todos: _todos,
		loading: false,
		error: null
	};
};

const todoUpdate = (state, { _id, todo }) => {
	const _todos = state.todos.map(td => {
		return td._id === _id ? todo : td;
	});

	return {
		...state,
		todos: _todos,
		loading: false,
		error: null
	};
};

const clearTodo = (state, action) => ({
	...state,
	todos: []
});

const reducer = (state = initState, action) => {
	switch (action.type) {
		case TODO_START:
			return todoStart(state, action);
		case TODO_SUCCESS:
			return todoSuccess(state, action);
		case TODO_FAIL:
			return todoFail(state, action);
		case TODO_DELETE:
			return todoDelete(state, action);
		case TODO_UPDATE:
			return todoUpdate(state, action);
		case USER_LOGOUT:
			return clearTodo(state, action);
		default:
			return state;
	}
};

export default reducer;
