import React from "react";
import { List } from "@material-ui/core";

import Todo from "./Todo";

const Todos = ({ onDelete, onCheck, todoList }) => {
	const lists = todoList.map(todo => (
		<Todo
			todo={todo}
			onCheck={onCheck}
			onDelete={onDelete}
			key={todo._id}
		/>
	));

	return <List>{lists}</List>;
};

export default Todos;
