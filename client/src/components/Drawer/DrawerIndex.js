import React, { Fragment } from "react";
import Hidden from "@material-ui/core/Hidden";

import DrawerMobile from "./DrawerMobile";
import DrawerDesktop from "./DrawerDesktop";

const DrawerIndex = props => {
    return (
        <Fragment>
            <Hidden smUp>
                <DrawerMobile {...props} />
            </Hidden>
            <Hidden xsDown>
                <DrawerDesktop {...props} />
            </Hidden>
        </Fragment>
    );
};

export default DrawerIndex;
