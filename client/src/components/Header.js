import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	withStyles
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const styles = theme => ({
	title: {
		flex: 1
	}
});

const Header = props => {
	const { classes } = props;
	return (
		<AppBar color="inherit">
			<Toolbar>
				<Typography variant="body1" className={classes.title}>
					Date
				</Typography>
				<IconButton>
					<Search />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default withStyles(styles)(Header);
