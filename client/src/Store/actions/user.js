import {
	USER_START,
	USER_SUCCESS,
	USER_FAIL,
	USER_LOGOUT
} from "./actionTypes";
import axios from "axios";

const userStart = () => ({ type: USER_START });

const userSuccess = user => ({ type: USER_SUCCESS, user });

const userFail = error => ({ type: USER_FAIL, error });

const userLogout = () => ({ type: USER_LOGOUT });

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

export const authAutoSignIn = cb => {
	return dispatch => {
		dispatch(userStart());
		axios
			.get("/api/user/authenticate")
			.then(({ data: { user } }) => {
				dispatch(userSuccess(user));
				if (cb) {
					cb();
				}
			})
			.catch(error => {
				dispatch(userFail(error));
				if (cb) {
					cb();
				}
			});
	};
};

export const onLogout = () => {
	return dispatch => {
		axios
			.get("/api/user/logout")
			.then(() => {
				dispatch(userLogout());
			})
			.catch(error => {
				dispatch(userFail(error));
			});
	};
};
