import React from "react";
import Typography from "@material-ui/core/Typography";

import IssueItem from "./IssueItem";

const IssueList = ({ items: { entities, result } }) => {
    if (!result || !result.length) {
        return <Typography>Oops! There is no Issues.</Typography>;
    }

    const list = result.map(item => (
        <IssueItem key={item} {...entities[item]} />
    ));

    return list;
};

export default IssueList;
