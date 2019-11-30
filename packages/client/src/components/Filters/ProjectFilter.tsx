import React from "react";
import { Typography } from "@material-ui/core";
import { useIProjectsFilterQuery } from "../../gql/project.query";
import BaseFilter from "../Base/BaseFilter";
import { FilterType } from "../../@types/types";
import { Sort, Status } from "../../generated/graphql";

const ProjectFilter = () => {
    const { data } = useIProjectsFilterQuery({
        filters: {
            sort: Sort.CREATED_DESC,
            status: Status.OPEN,
        },
    });

    if (!data || !data.projects) {
        return <Typography>...</Typography>;
    }

    return (
        <BaseFilter
            title="Project"
            type={FilterType.PROJECT}
            options={data.projects}
        />
    );
};

export default ProjectFilter;
