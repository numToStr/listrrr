import React, { FC } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";

import BaseSurface from "./BaseSurface";

const BaseBlockQuote: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <BaseSurface>
            <Box
                width={2}
                height="60%"
                position="absolute"
                left={0}
                top="50%"
                style={{
                    transform: "translate(-50%, -50%)"
                }}
                {...props}
            />
            {children}
        </BaseSurface>
    );
};

export default BaseBlockQuote;
