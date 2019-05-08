import React from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/HomeTwoTone";
import ProjectIcon from "@material-ui/icons/AssignmentTwoTone";
import IssuesIcon from "@material-ui/icons/BugReportTwoTone";
import BaseLink from "../Base/BaseRouterLink";

const items = [
    {
        text: "Home 😋",
        icon: HomeIcon,
        path: "/d/home"
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

const styles = ({ palette }) => ({
    linkColor: {
        color: palette.primary.contrastText
    }
});

const DrawerList = ({ classes, location: { pathname } }) => {
    const list = items.map(({ text, icon: Icon, path }) => {
        return (
            <ListItem
                button
                key={text}
                component={BaseLink}
                to={path}
                selected={path === pathname}
                disableRipple
                disableTouchRipple
            >
                <ListItemIcon
                    classes={{
                        root: classes.linkColor
                    }}
                >
                    <Icon />
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

export default withRouter(withStyles(styles)(DrawerList));
