import React from "react";
import Box from "@material-ui/core/Box";

import Surface from "../Surface";

const BaseBlockQuote = ({ children, color = "primary.main" }) => {
    return (
        <Surface>
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
        </Surface>
    );
};

export default BaseBlockQuote;
