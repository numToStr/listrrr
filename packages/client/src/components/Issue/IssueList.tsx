import React, { FC, memo } from "react";
import { Box } from "@material-ui/core";
import IssueItem from "./IssueItem";
import { IssuesQuery } from "../../gql/issue.query";

type Props = IssuesQuery;

const IssueList: FC<Props> = ({ issues }) => {
    const list = issues.map(issue => {
        return <IssueItem key={issue._id} issue={issue} />;
    });

    return <Box mb={5}>{list}</Box>;
};

export default memo(IssueList);
