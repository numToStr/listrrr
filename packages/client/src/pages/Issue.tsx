import React, { Fragment, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useIssuesLazyQuery } from "../gql/issue.query";
import Header from "../components/Header";
import BaseLoader from "../components/Base/BaseLoader";
import IssueList from "../components/Issue/IssueList";
import BaseFilterBox from "../components/Base/BaseFilterBox";
import StatusFilter from "../components/Filters/StatusFilter";
import SortFilter from "../components/Filters/SortFilter";
import { useParseSearch } from "../utils/hooks/useSearch";

const Issue = () => {
    const { search } = useLocation();
    const filters = useParseSearch(search);
    const [getIssues, { data, loading }] = useIssuesLazyQuery();

    useEffect(() => {
        getIssues({
            variables: { filters },
        });
    }, [filters, getIssues]);

    const renderList = useCallback(() => {
        if (loading) {
            return <BaseLoader />;
        }

        if (!data || !data.issues.length) {
            return <Typography>No issues found...</Typography>;
        }

        return <IssueList issues={data.issues} />;
    }, [data, loading]);

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
