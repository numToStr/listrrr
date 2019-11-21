import React, { Fragment, useCallback } from "react";
import { useIssuesQuery } from "../gql/issue.query";
import Header from "../components/Header";
import BaseLoader from "../components/Base/BaseLoader";
import IssueList from "../components/Issue/IssueList";
import BaseFilterBox from "../components/Base/BaseFilterBox";
import StatusFilter from "../components/Filters/StatusFilter";
import SortFilter from "../components/Filters/SortFilter";

const Issue = () => {
    const { data } = useIssuesQuery();

    const renderList = useCallback(() => {
        if (!data) {
            return <BaseLoader />;
        }

        return <IssueList issues={data.issues} />;
    }, [data]);

    return (
        <Fragment>
            <Header title="Issues" goToCreate="/d/issue/create" />
            <BaseFilterBox>
                <StatusFilter />
                <SortFilter />
            </BaseFilterBox>
            {renderList()}
        </Fragment>
    );
};

export default Issue;
