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
	Delete as DeleteIcon,
	RadioButtonUnchecked,
	CheckCircleRounded
} from "@material-ui/icons";

class Todo extends Component {
	state = {
		anchorEl: null,
		todoCheck: false
	};

	componentDidMount() {
		const {
			todo: { checked }
		} = this.props;
		this.setState(prevState => {
			return {
				todoCheck: checked
			};
		});
	}

	openMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	closeMenu = () => {
		this.setState({ anchorEl: null });
	};

	onTodoCheck = () => {
		const {
			onCheck,
			todo: { _id }
		} = this.props;

		this.setState(prevState => {
			onCheck(_id, !prevState.todoCheck);
			return {
				todoCheck: !prevState.todoCheck
			};
		});
	};

	render() {
		const {
			openMenu,
			closeMenu,
			onTodoCheck,
			state: { anchorEl },
			props: {
				todo: { _id, title, description, checked },
				onDelete,
				onEdit
			}
		} = this;

		return (
			<Fragment>
				<ListItem>
					<Checkbox
						color="primary"
						checked={checked}
						onChange={onTodoCheck}
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
					<MenuItem onClick={onEdit(_id)}>
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
