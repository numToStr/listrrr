import React, { Fragment, Component } from "react";
import {
	ListItem,
	Checkbox,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Menu,
	MenuItem
	// ListItemIcon
} from "@material-ui/core";
import {
	MoreVert as MenuIcon,
	Edit as EditIcon,
	Delete as DeleteIcon
} from "@material-ui/icons";

class Todo extends Component {
	state = {
		anchorEl: null
	};

	openMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	closeMenu = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const {
			openMenu,
			closeMenu,
			state: { anchorEl },
			props: {
				todo: { _id, title, description },
				onCheck,
				onDelete
			}
		} = this;

		return (
			<Fragment>
				<ListItem dense>
					<Checkbox
						color="primary"
						onChange={onCheck(_id)}
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
					<MenuItem>
						{/* <ListItemIcon> */}
						<EditIcon />
						{/* </ListItemIcon> */}
						{/* <ListItemText inset primary="Edit" /> */}
					</MenuItem>
					<MenuItem onClick={onDelete(_id)}>
						{/* <ListItemIcon> */}
						<DeleteIcon style={{ color: "red" }} />
						{/* </ListItemIcon> */}
						{/* <ListItemText inset primary="Delete" /> */}
					</MenuItem>
				</Menu>
			</Fragment>
		);
	}
}

export default Todo;
