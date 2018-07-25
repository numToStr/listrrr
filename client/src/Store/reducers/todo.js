import { TODO_START, TODO_SUCCESS, TODO_FAIL } from "../actions/actionTypes";

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
		todos,
		loading: false,
		error: null
	};
};

const todoFail = (state, { error }) => ({
	...state,
	loading: false,
	error
});

const reducer = (state = initState, action) => {
	switch (action.type) {
		case TODO_START:
			return todoStart(state, action);
		case TODO_SUCCESS:
			return todoSuccess(state, action);
		case TODO_FAIL:
			return todoFail(state, action);
		default:
			return state;
	}
};

export default reducer;
