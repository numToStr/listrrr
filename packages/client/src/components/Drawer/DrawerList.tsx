import React, { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProjectIcon from "@material-ui/icons/AssignmentTwoTone";
import IssuesIcon from "@material-ui/icons/BugReportTwoTone";
import { DrawerType } from "../../@types/types";
import DrawerUserItem from "./DrawerUserItem";

const items = [
    {
        text: "Projects",
        icon: ProjectIcon,
        path: "/d/project",
    },
    {
        text: "Issues",
        icon: IssuesIcon,
        path: "/d/issue",
    },
];

type Props = {
    onTap?(): void;
    type: DrawerType;
};

const useStyles = makeStyles(
    ({ palette: { primary }, shape: { borderRadius }, spacing }) => ({
        icon: {
            color: primary.contrastText,
        },
        listItem: {
            borderRadius,
            marginTop: spacing(0.25),
        },
    })
);

const DrawerList: FC<Props> = ({ onTap, type }) => {
    const styles = useStyles();
    const { pathname } = useLocation();
    const { push } = useHistory();

    const handleLinkClick = (path: string) => () => {
        push(path);
        if (typeof onTap === "function" && type === DrawerType.MOBILE) {
            // NOTE: onTap() is only implemented for mobile drawer for closing after click on link item
            onTap();
        }
    };

    const list = items.map(({ text, icon: Icon, path }) => {
        const isSelected = pathname.startsWith(path);

        return (
            <ListItem
                key={path}
                button
                selected={isSelected}
                onClick={handleLinkClick(path)}
                className={styles.listItem}
            >
                <ListItemIcon
                    classes={{
                        root: styles.icon,
                    }}
                >
                    <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography color="inherit">{text}</Typography>}
                />
            </ListItem>
        );
    });

    return (
        <List disablePadding>
            <DrawerUserItem />
            {list}
        </List>
    );
};

export default DrawerList;
