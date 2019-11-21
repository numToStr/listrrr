import React, { FC } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";

type Props = BoxProps;

const BaseFilterBox: FC<Props> = ({ children, ...props }) => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            p={1}
            mb={1}
            {...props}
        >
            {children}
        </Box>
    );
};

export default BaseFilterBox;
