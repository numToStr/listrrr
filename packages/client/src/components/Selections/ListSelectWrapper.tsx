import React, { FC } from "react";
import { Box, Typography } from "@material-ui/core";

interface Props {
    title: string;
}

const ListSelectWrapper: FC<Props> = ({ children, title }) => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={0.5}
        >
            <Typography variant="subtitle2">{title}</Typography>
            {children}
        </Box>
    );
};

export default ListSelectWrapper;
