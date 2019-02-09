import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Grid
} from "@material-ui/core";
import { /* Search */ PowerSettingsNew } from "@material-ui/icons";
import { format } from "date-fns";

const Header = ({ onLogout }) => {
	return (
		<AppBar position="static" color="inherit">
			<Toolbar>
				<Grid container spacing={8} alignItems="center">
					<Grid item>
						<Typography variant="headline" color="primary">
							{format(new Date(), "DD")}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="caption">
							{format(new Date(), "MMM")}
						</Typography>
						<Typography variant="caption">
							{format(new Date(), "YYYY")}
						</Typography>
					</Grid>
				</Grid>
				{/* <IconButton>
					<Search />
				</IconButton> */}
				<IconButton color="primary" onClick={onLogout}>
					<PowerSettingsNew />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
