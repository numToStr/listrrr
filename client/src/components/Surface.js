import React, { memo } from "react";
import Box from "@material-ui/core/Box";

const Surface = ({ children, ...props }) => (
    <Box py={1.5} px={{ xs: 2, md: 3 }} position="relative" {...props}>
        {children}
    </Box>
);

export default memo(Surface);
