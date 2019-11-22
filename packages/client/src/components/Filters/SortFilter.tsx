import React from "react";
import SortIcon from "@material-ui/icons/SortTwoTone";
import { FilterOption, FilterType } from "../../@types/types";
import BaseFilter from "../Base/BaseFilter";
import { Sort } from "../../generated/graphql";

const options: FilterOption<Sort>[] = [
    {
        title: "Newest",
        value: Sort.CreatedDesc,
    },
    {
        title: "Oldest",
        value: Sort.CreatedAsc,
    },
    {
        title: "Recently updated",
        value: Sort.UpdatedDesc,
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
