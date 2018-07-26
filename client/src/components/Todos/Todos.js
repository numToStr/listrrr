import React from "react";
import { List, ListSubheader } from "@material-ui/core";

import Todo from "./Todo";

const Todos = ({ onDelete, onCheck, onEdit, todoList }) => {
	const lists = todoList.map(todo => (
		<Todo
			todo={todo}
			onCheck={onCheck}
			onDelete={onDelete}
			onEdit={onEdit}
			key={todo._id}
		/>
	));

	return (
		<List
			style={{
				paddingBottom: "5rem"
			}}
			component="nav"
			subheader={
				<ListSubheader component="div">Your Todos</ListSubheader>
			}
		>
			{lists}
		</List>
	);
};

export default Todos;
