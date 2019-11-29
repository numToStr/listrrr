import React from "react";
import SortIcon from "@material-ui/icons/SortTwoTone";
import { FilterOption, FilterType } from "../../@types/types";
import BaseFilter from "../Base/BaseFilter";
import { Sort } from "../../generated/graphql";

const options: FilterOption<Sort>[] = [
    {
        title: "Newest",
        value: Sort.CREATED_DESC,
    },
    {
        title: "Oldest",
        value: Sort.CREATED_ASC,
    },
    {
        title: "Recently updated",
        value: Sort.UPDATED_DESC,
    },
];

const SortFilter = () => {
    return (
        <BaseFilter
            title="Sort"
            type={FilterType.SORT}
            options={options}
            icon={<SortIcon />}
        />
    );
};

export default SortFilter;
