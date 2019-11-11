import React from "react";
import { useParams } from "react-router-dom";
import { useIssueQuery } from "../gql/issue.query";

type Params = {
    issueID: string;
};

const IssueView = () => {
    const { issueID } = useParams<Params>();
    const { data } = useIssueQuery({ _id: issueID });

    return <div>{data && data.issue.title}</div>;
};

export default IssueView;
