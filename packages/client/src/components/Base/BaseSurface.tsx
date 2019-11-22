import React, { memo, FC } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";

const BaseSurface: FC<BoxProps> = ({ children, ...props }) => (
    <Box py={1.5} px={{ xs: 2, md: 3 }} position="relative" {...props}>
        {children}
    </Box>
);

export default memo(BaseSurface);
