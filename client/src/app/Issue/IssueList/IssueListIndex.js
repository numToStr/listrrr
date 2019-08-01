import React, { Fragment } from "react";

import IssueList from "./IssueList";
import Header from "../../../components/Header/Header";

const IssueListIndex = () => {
    return (
        <Fragment>
            <Header title="Issues" addLink="/d/issues/add" />
            <IssueList />
        </Fragment>
    );
};

export default IssueListIndex;
