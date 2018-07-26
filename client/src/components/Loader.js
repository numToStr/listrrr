import React from "react";
import { Grid, CircularProgress, withStyles } from "@material-ui/core";

const styles = theme => ({
	grid: {
		height: "100vh"
	}
});

const Loader = ({ classes }) => {
	return (
		<Grid
			container
			justify="center"
			alignItems="center"
			className={classes.grid}
		>
			<CircularProgress color="primary" />
		</Grid>
	);
};

export default withStyles(styles)(Loader);
