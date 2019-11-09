import React, { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import ProjectIcon from "@material-ui/icons/AssignmentTwoTone";
import IssuesIcon from "@material-ui/icons/BugReportTwoTone";

const items = [
    {
        text: "Dashboard",
        icon: HomeIcon,
        path: "/d/dash"
    },
    {
        text: "Projects",
        icon: ProjectIcon,
        path: "/d/projects/list"
    },
    {
        text: "Issues",
        icon: IssuesIcon,
        path: "/d/issues/list"
    }
];

const useStyles = makeStyles(
    ({ palette: { primary }, shape: { borderRadius } }) => ({
        linkColor: {
            color: primary.contrastText
        },
        listRounded: {
            borderRadius
        }
    })
);

export enum DrawerType {
    DESKTOP,
    MOBILE
}

type Props = {
    onTap?(): void;
    type: DrawerType;
};

export const DrawerList: FC<Props> = ({ onTap, type }) => {
    const classes = useStyles();
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
        return (
            <ListItem
                key={path}
                button
                selected={path === pathname}
                onClick={handleLinkClick(path)}
                className={classes.listRounded}
            >
                <ListItemIcon>
                    <Icon fontSize="small" className={classes.linkColor} />
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    classes={{
                        primary: classes.linkColor
                    }}
                />
            </ListItem>
        );
    });

    return <List disablePadding>{list}</List>;
};
