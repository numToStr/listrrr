import { USER_START, USER_SUCCESS, USER_FAIL } from "../actions/actionTypes";

const initState = {
	user: null,
	loading: false,
	error: null
};

const userStart = (state, action) => ({
	...state,
	loading: true
});

const userSuccess = (state, { user }) => ({
	...state,
	loading: false,
	error: null,
	user
});
const userFail = (state, { error }) => ({
	...state,
	loading: false,
	user: null,
	error
});

const reducer = (state = initState, action) => {
	switch (action.type) {
		case USER_START:
			return userStart(state, action);
		case USER_SUCCESS:
			return userSuccess(state, action);
		case USER_FAIL:
			return userFail(state, action);
		default:
			return state;
	}
};

export default reducer;
