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
    makeStyles,
    Theme,
    ListItemIcon,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddTwoTone";
import { Maybe } from "../../generated/graphql";
import FormikCheckbox from "../Form/FormikCheckbox";

export interface Item {
    title: string;
    value: any;
    icon?: JSX.Element;
}

type Props = {
    list: Maybe<Item>[];
    title: string;
};

const useStyles = makeStyles(({ spacing }: Theme) => ({
    icon: {
        minWidth: spacing(4),
    },
    text: {
        marginRight: spacing(2),
    },
}));

const ListSelectPopup: FC<Props> = ({ list, title }) => {
    const classes = useStyles();
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
                            {d?.icon && (
                                <ListItemIcon className={classes.icon}>
                                    {d?.icon}
                                </ListItemIcon>
                            )}
                            <ListItemText
                                primary={d?.title}
                                className={classes.text}
                                primaryTypographyProps={{
                                    variant: "caption",
                                }}
                            />
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
