import React, { memo } from "react";
import Drawer from "@material-ui/core/Drawer";
import DrawerList from "./DrawerList";

const DrawerDesktop = props => {
    return (
        <Drawer {...props} variant="permanent" anchor="left">
            <DrawerList />
        </Drawer>
    );
};

export default memo(DrawerDesktop);
