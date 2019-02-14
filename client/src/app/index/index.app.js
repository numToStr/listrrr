import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import NavLink from "react-router-dom/NavLink";

const IndexApp = () => {
    return (
        <Fragment>
            <Typography>
                <NavLink to="/signup">Signup</NavLink>
            </Typography>
            <Typography>
                <NavLink to="/login">Login</NavLink>
            </Typography>
        </Fragment>
    );
};

export default IndexApp;
