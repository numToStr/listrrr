import React, { FC } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import IssueItem from "./IssueItem";
import { IssuesQuery } from "../../generated/graphql";

type Props = IssuesQuery & BoxProps;

const IssueList: FC<Props> = ({ issues, ...props }) => {
    const list = issues.map(i => {
        return i && <IssueItem key={i._id} issue={i} />;
    });

    return (
        <Box mb={5} {...props}>
            {list}
        </Box>
    );
};

export default IssueList;
