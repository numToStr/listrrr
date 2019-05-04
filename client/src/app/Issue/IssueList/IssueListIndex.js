import React, { Fragment } from "react";

import IssueList from "./IssueList";
import Header from "../../../components/Header/Header";
import Subheader from "../../../components/Header/Subheader";

const IssueListIndex = ({ location }) => {
    return (
        <Fragment>
            <Header title="Issues" addLink="/d/issues/add" />
            <Subheader />
            <IssueList location={location} />
        </Fragment>
    );
};

export default IssueListIndex;
