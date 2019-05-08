import React, { Fragment } from "react";

import IssueList from "./IssueList";
import Header from "../../../components/Header/Header";
import Subheader from "../../../components/Header/Subheader";

const IssueListIndex = () => {
    return (
        <Fragment>
            <Header title="Issues" addLink="/d/issues/add" />
            <Subheader />
            <IssueList />
        </Fragment>
    );
};

export default IssueListIndex;
