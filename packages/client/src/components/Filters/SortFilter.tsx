import React from "react";
import SortIcon from "@material-ui/icons/SortTwoTone";
import { FilterOption, FilterType } from "../../@types/types";
import BaseFilter from "../Base/BaseFilter";

const options: FilterOption[] = [
    {
        title: "Newest",
        value: "created-desc",
    },
    {
        title: "Oldest",
        value: "created-asc",
    },
    {
        title: "Recently updated",
        value: "updated-desc",
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
