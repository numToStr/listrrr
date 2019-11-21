/**
 * Filter Schema:
 * entity:
 *      - is:issue
 *      - is:project
 * status:
 *      - is:closed
 *      - is:open
 * sort:
 *      - sort:created-asc
 *      - sort:created-desc
 *      - sort:updated-desc
 */
import React, { Fragment, useState, ReactEventHandler, FC } from "react";
import { Button, Popover, MenuItem, MenuList } from "@material-ui/core";
import { usePushSearch } from "../../utils/hooks/useSearch";
import { FilterOption, FilterType } from "../../@types/types";

type Props = {
    title: string;
    type: FilterType;
    options: FilterOption[];
    icon?: JSX.Element;
};

const BaseFilter: FC<Props> = ({ title, options, type, icon }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const pushSearch = usePushSearch();

    const handleOpen: ReactEventHandler<HTMLButtonElement> = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const goTo = (value: string) => () => {
        pushSearch({ [type]: value });
        handleClose();
    };

    const items = options.map(({ title, value }) => (
        <MenuItem key={value} dense color="inherit" onClick={goTo(value)}>
            {title}
        </MenuItem>
    ));

    return (
        <Fragment>
            <Button
                variant="text"
                size="small"
                onClick={handleOpen}
                endIcon={icon}
            >
                {title}
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuList>{items}</MenuList>
            </Popover>
        </Fragment>
    );
};

export default BaseFilter;
