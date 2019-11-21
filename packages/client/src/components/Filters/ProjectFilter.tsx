import React from "react";
import { Typography } from "@material-ui/core";
import { useProjectsFilterQuery } from "../../gql/project.query";
import BaseFilter from "../Base/BaseFilter";
import { FilterType } from "../../@types/types";

const ProjectFilter = () => {
    const { data } = useProjectsFilterQuery();

    return data ? (
        <BaseFilter
            title="Project"
            type={FilterType.PROJECT}
            options={data.projects}
        />
    ) : (
        <Typography>...</Typography>
    );
};

export default ProjectFilter;
