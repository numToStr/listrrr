import React, { useState, MouseEvent, Fragment, FC } from "react";
import {
    IconButton,
    Popover,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddTwoTone";
import { Maybe } from "../../generated/graphql";
import FormikForm from "../Form/FormikForm";
import FormikCheckbox from "../Form/FormikCheckbox";
import FormikSubmitButton from "../Form/FormikSubmitButton";

export interface Item {
    title: string;
    value: any;
}

type Props = {
    list: Maybe<Item>[];
};

export const ListSelectionPopup2 = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <FormikForm initialValues={{ list: [] }} onSubmit={onSubmit}>
            <FormikCheckbox name="list" value="alsdfljadsjf" />
            <FormikSubmitButton>Hello</FormikSubmitButton>
        </FormikForm>
    );
};

const ListSelectionPopup: FC<Props> = ({ list }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (values: any) => {
        console.log(values);

        setAnchorEl(null);
    };

    return (
        <Fragment>
            <IconButton size="small" onClick={handleOpen}>
                <AddIcon fontSize="small" />
            </IconButton>
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
                <List
                    dense
                    subheader={<ListSubheader># Projects</ListSubheader>}
                >
                    <FormikForm
                        initialValues={{ list: [] }}
                        onSubmit={handleClose}
                    >
                        {list.map(d => (
                            <FormikCheckbox
                                name="list"
                                key={d?.value}
                                value={d?.value}
                            />
                        ))}
                        <FormikSubmitButton>Hello</FormikSubmitButton>
                    </FormikForm>

                    {/* {list.map((d, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={d?.title} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    // onChange={handleToggle(value)}
                                    checked={true}
                                    // inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))} */}
                </List>
            </Popover>
        </Fragment>
    );
};

export default ListSelectionPopup;
