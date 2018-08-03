import React from "react";
import { Grid } from "@material-ui/core";
import Home from "../containers/Home";

const HomeView = () => {
	return (
		<Grid container justify="center">
			<Grid item xs={10} sm={5} md={3}>
				<Home />
			</Grid>
		</Grid>
	);
};

export default HomeView;
