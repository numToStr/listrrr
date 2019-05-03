import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const LandingIndex = () => {
    return (
        <Fragment>
            <Typography>
                <Link to="/signup">Signup</Link>
            </Typography>
            <Typography>
                <Link to="/login">Login</Link>
            </Typography>
        </Fragment>
    );
};

export default LandingIndex;
