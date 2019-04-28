import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import styled from "@material-ui/styles/styled";

const MyPaper = styled(Paper)({
    padding: "12px 24px"
});

const Surface = ({ children, ...props }) => (
    <MyPaper {...props}>{children}</MyPaper>
);

export default memo(Surface);
