import React from "react";
import IssueItem from "./issue.item";

const IssueList = ({ items }) => {
    const list = items.map(item => <IssueItem key={item._id} {...item} />);

    return list;
};

export default IssueList;
