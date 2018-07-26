import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	withStyles
} from "@material-ui/core";
import { /* Search */ PowerSettingsNew } from "@material-ui/icons";

const styles = theme => ({
	title: {
		flex: 1
	}
});

const Header = ({ classes, onLogout }) => {
	return (
		<AppBar position="static" color="inherit">
			<Toolbar>
				<Typography variant="body1" className={classes.title}>
					Date
				</Typography>
				{/* <IconButton>
					<Search />
				</IconButton> */}
				<IconButton onClick={onLogout}>
					<PowerSettingsNew />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default withStyles(styles)(Header);
