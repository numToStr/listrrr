import React, { Fragment, Component } from "react";
import {
	ListItem,
	Checkbox,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Menu,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText
} from "@material-ui/core";
import {
	MoreVert as MenuIcon,
	EditTwoTone as EditIcon,
	DeleteTwoTone as DeleteIcon,
	RadioButtonUnchecked,
	CheckCircleRounded,
	AlarmOnTwoTone as AlarmIcon
} from "@material-ui/icons";

import { format } from "date-fns";

class Todo extends Component {
	state = {
		anchorEl: null,
		reminderDialog: false
	};

	openMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	closeMenu = () => {
		this.setState({ anchorEl: null });
	};

	openReminder = () => {
		this.setState({ reminderDialog: true });
	};
	closeReminder = () => {
		this.setState({ reminderDialog: false });
	};

	render() {
		const {
			openMenu,
			closeMenu,
			openReminder,
			closeReminder,
			state: { anchorEl, reminderDialog },
			props: {
				todo: { _id, title, description, checked, reminder },
				onDelete,
				onEdit,
				onCheck
			}
		} = this;

		return (
			<Fragment>
				<ListItem>
					<Checkbox
						color="primary"
						checked={checked}
						onChange={onCheck(_id, !checked)}
						icon={<RadioButtonUnchecked />}
						checkedIcon={<CheckCircleRounded />}
						disableRipple
					/>
					<ListItemText primary={title} secondary={description} />
					<ListItemSecondaryAction>
						<IconButton onClick={openMenu}>
							<MenuIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={closeMenu}
				>
					<MenuItem onClick={openReminder}>
						<AlarmIcon />
					</MenuItem>
					<MenuItem onClick={onEdit(_id)}>
						<EditIcon />
					</MenuItem>
					<MenuItem onClick={onDelete(_id)}>
						<DeleteIcon style={{ color: "red" }} />
					</MenuItem>
				</Menu>
				<Dialog open={reminderDialog} onClose={closeReminder}>
					<DialogTitle>Reminder</DialogTitle>
					<DialogContent>
						<DialogContentText variant="subheading">
							{format(
								new Date(reminder),
								"ddd MMM D YYYY h:mm a"
							)}
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

export default Todo;
