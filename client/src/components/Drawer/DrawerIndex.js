import React, { Fragment, lazy } from "react";
import Hidden from "@material-ui/core/Hidden";

const DrawerMobile = lazy(() => import("./DrawerMobile"));
const DrawerDesktop = lazy(() => import("./DrawerDesktop"));

const DrawerIndex = () => (
    <Fragment>
        <Hidden smUp>
            <DrawerMobile />
        </Hidden>
        <Hidden xsDown>
            <DrawerDesktop />
        </Hidden>
    </Fragment>
);

export default DrawerIndex;
