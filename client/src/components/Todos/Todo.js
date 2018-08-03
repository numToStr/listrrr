import React, { Fragment, PureComponent } from "react";
import {
	ListItem,
	Checkbox,
	ListItemText,
	ListItemSecondaryAction,
	IconButton
} from "@material-ui/core";
import {
	MoreVert as MenuIcon,
	RadioButtonUnchecked,
	CheckCircleRounded
} from "@material-ui/icons";

class Todo extends PureComponent {
	render() {
		const {
			props: {
				todo: { _id, title, description, checked, reminder },
				openMenu,
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
						<IconButton onClick={openMenu(_id, reminder)}>
							<MenuIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</Fragment>
		);
	}
}

export default Todo;
