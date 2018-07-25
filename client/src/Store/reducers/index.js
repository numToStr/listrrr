import { reducer as formReducer } from "redux-form";
import user from "./user";
import todo from "./todo";

export default {
	form: formReducer,
	user,
	todo
};
