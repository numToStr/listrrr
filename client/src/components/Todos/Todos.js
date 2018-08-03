import React, { Component, Fragment } from "react";
import {
	List,
	ListSubheader,
	Menu,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText
} from "@material-ui/core";
import {
	EditTwoTone as EditIcon,
	DeleteTwoTone as DeleteIcon,
	AlarmOnTwoTone as AlarmIcon
} from "@material-ui/icons";

import { format /* differenceInMilliseconds */ } from "date-fns";

import Todo from "./Todo";

class Todos extends Component {
	state = {
		anchorEl: null,
		reminderDialog: false,
		selectedTodoId: null,
		selectedTodoReminder: null
	};

	/* setReminder = () => {
		const {
			todo: { title, reminder }
		} = this.props;

		const _time = differenceInMilliseconds(new Date(), new Date(reminder));

		if (_time > 0) {
			this._timeout = setTimeout(() => {
				alert(`Reminder for ${title}`);
			}, _time);
		} else {
			clearTimeout(this._timeout);
		}
	}; */

	openMenu = (_id, reminder) => event => {
		this.setState({
			selectedTodoId: _id,
			selectedTodoReminder: reminder,
			anchorEl: event.currentTarget
		});
	};

	closeMenu = () => {
		this.setState({ anchorEl: null });
	};

	openReminder = () => {
		this.closeMenu();
		this.setState({ reminderDialog: true });
	};

	closeReminder = () => {
		this.setState({ reminderDialog: false });
	};

	clickEdit = () => {
		const {
			closeMenu,
			state: { selectedTodoId },
			props: { onEdit }
		} = this;

		onEdit(selectedTodoId)();
		closeMenu();
	};

	clickDelete = () => {
		const {
			closeMenu,
			state: { selectedTodoId },
			props: { onDelete }
		} = this;

		onDelete(selectedTodoId);
		closeMenu();
	};

	render() {
		const {
			openMenu,
			closeMenu,
			openReminder,
			closeReminder,
			clickEdit,
			clickDelete,
			state: { anchorEl, selectedTodoReminder, reminderDialog },
			props: { onCheck, todoList }
		} = this;

		const lists = todoList.map(todo => (
			<Todo
				todo={todo}
				onCheck={onCheck}
				openMenu={openMenu}
				key={todo._id}
			/>
		));

		return (
			<Fragment>
				<List
					style={{
						paddingBottom: "5rem"
					}}
					component="nav"
					subheader={
						<ListSubheader component="div">
							Your Todos
						</ListSubheader>
					}
				>
					{lists}
				</List>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={closeMenu}
				>
					<MenuItem onClick={openReminder}>
						<AlarmIcon />
					</MenuItem>
					<MenuItem onClick={clickEdit}>
						<EditIcon />
					</MenuItem>
					<MenuItem onClick={clickDelete}>
						<DeleteIcon style={{ color: "red" }} />
					</MenuItem>
				</Menu>
				<Dialog open={reminderDialog} onClose={closeReminder}>
					<DialogTitle>Reminder at</DialogTitle>
					<DialogContent>
						<DialogContentText variant="subheading">
							{format(
								new Date(selectedTodoReminder),
								"ddd MMM D YYYY h:mm a"
							)}
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

export default Todos;
