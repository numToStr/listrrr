import { USER_START, USER_SUCCESS, USER_FAIL } from "./actionTypes";
import axios from "axios";

const userStart = () => ({ type: USER_START });

const userSuccess = user => ({ type: USER_SUCCESS, user });

const userFail = error => ({ type: USER_FAIL, error });

export const onAddUser = data => {
	return dispatch => {
		dispatch(userStart());
		axios
			.post("/api/user", data)
			.then(({ data: { user } }) => {
				dispatch(userSuccess(user));
			})
			.catch(error => {
				dispatch(userFail(error));
			});
	};
};

export const authAutoSignIn = () => {
	return dispatch => {
		dispatch(userStart());
		axios
			.get("/api/user/authenticate")
			.then(({ data: { user } }) => {
				dispatch(userSuccess(user));
			})
			.catch(error => {
				dispatch(userFail(error));
			});
	};
};
