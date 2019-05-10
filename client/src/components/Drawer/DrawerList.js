import React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/styles/makeStyles";
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

const useStyles = makeStyles(({ palette }) => ({
    linkColor: {
        color: palette.primary.contrastText
    }
}));

const DrawerList = ({ location: { pathname } }) => {
    const classes = useStyles();

    const list = items.map(({ text, icon: Icon, path }) => {
        return (
            <ListItem
                button
                key={text}
                component={BaseLink}
                to={path}
                selected={path === pathname}
                // disableRipple
                disableTouchRipple
            >
                <ListItemIcon>
                    <Icon className={classes.linkColor} />
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

export default withRouter(DrawerList);
