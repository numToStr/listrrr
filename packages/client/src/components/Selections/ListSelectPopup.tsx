/**
 * This component should be wrapped by <ListPopupConext />
 * or Inside any <Formik />
 */
import React, { FC, useState, MouseEvent, Fragment } from "react";
import { useFormikContext } from "formik";
import {
    IconButton,
    Popover,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddTwoTone";
import { Maybe } from "../../generated/graphql";
import FormikCheckbox from "../Form/FormikCheckbox";

export interface Item {
    title: string;
    value: any;
}

type Props = {
    list: Maybe<Item>[];
    title: string;
};

const ListSelectPopup: FC<Props> = ({ list, title }) => {
    const { handleSubmit } = useFormikContext();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        handleSubmit();
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
                    subheader={<ListSubheader># {title}</ListSubheader>}
                >
                    {list.map(d => (
                        <ListItem button key={d?.value}>
                            <ListItemText primary={d?.title} />
                            <ListItemSecondaryAction>
                                <FormikCheckbox
                                    name="list"
                                    size="small"
                                    value={d?.value}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Fragment>
    );
};

export default ListSelectPopup;
