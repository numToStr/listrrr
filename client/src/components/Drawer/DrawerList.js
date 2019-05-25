import React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/styles/makeStyles";

import BaseLink from "../Base/BaseRouterLink";
import IconHome from "../Icons/IconHome";
import IconProject from "../Icons/IconProject";
import IconIssue from "../Icons/IconIssue";

const items = [
    {
        text: "Home 😋",
        icon: IconHome,
        path: "/d/home"
    },
    {
        text: "Projects",
        icon: IconProject,
        path: "/d/projects/list"
    },
    {
        text: "Issues",
        icon: IconIssue,
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

export default withRouter(DrawerList);
