import React from "react";
import Box from "@material-ui/core/Box";

import BaseSurface from "./BaseSurface";

const BaseBlockQuote = ({ children, color = "primary.main" }) => {
    return (
        <BaseSurface>
            <Box
                width={2}
                bgcolor={color}
                height="60%"
                position="absolute"
                left={0}
                top="50%"
                style={{
                    transform: "translate(-50%, -50%)"
                }}
            />
            {children}
        </BaseSurface>
    );
};

export default BaseBlockQuote;
