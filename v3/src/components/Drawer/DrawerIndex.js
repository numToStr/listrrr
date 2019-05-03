import React from "react";
import Drawer from "@material-ui/core/Drawer";

import DrawerList from "./DrawerList";

const DrawerIndex = props => {
    return (
        <Drawer {...props} variant="permanent" anchor="left">
            <DrawerList />
        </Drawer>
    );
};

export default DrawerIndex;
