import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import Surface from "./Surface";

const ListCard = ({ children }) => (
    <Box mb={1}>
        <Surface>{children}</Surface>
    </Box>
);

export default memo(ListCard);
