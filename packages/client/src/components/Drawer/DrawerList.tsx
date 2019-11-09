import React, { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box
} from "@material-ui/core";
// import HomeIcon from "@material-ui/icons/HomeTwoTone";
import ProjectIcon from "@material-ui/icons/AssignmentTwoTone";
import IssuesIcon from "@material-ui/icons/BugReportTwoTone";

const items = [
    // {
    //     text: "Dashboard",
    //     icon: HomeIcon,
    //     path: "/d/login"
    // },
    {
        text: "Projects",
        icon: ProjectIcon,
        path: "/d/project"
    },
    {
        text: "Issues",
        icon: IssuesIcon,
        path: "/d/issue"
    }
];

export enum DrawerType {
    DESKTOP,
    MOBILE
}

type Props = {
    onTap?(): void;
    type: DrawerType;
};

export const DrawerList: FC<Props> = ({ onTap, type }) => {
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
            <Box clone key={path} borderRadius="borderRadius">
                <ListItem
                    button
                    selected={path === pathname}
                    onClick={handleLinkClick(path)}
                >
                    <ListItemIcon>
                        <Box clone color="primary.contrastText">
                            <Icon fontSize="small" />
                        </Box>
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography color="inherit">{text}</Typography>
                        }
                    />
                </ListItem>
            </Box>
        );
    });

    return <List disablePadding>{list}</List>;
};
