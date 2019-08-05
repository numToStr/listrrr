import React from "react";
// import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

const LandingIndex = () => {
    return <Redirect to="/login" />;

    // return (
    //     <Fragment>
    //         <Typography>
    //             <Link to="/signup">Signup</Link>
    //         </Typography>
    //         <Typography>
    //             <Link to="/login">Login</Link>
    //         </Typography>
    //     </Fragment>
    // );
};

export default LandingIndex;
