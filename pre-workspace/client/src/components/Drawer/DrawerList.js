import React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/styles/makeStyles";

import IconHome from "../Icons/IconHome";
import IconProject from "../Icons/IconProject";
import IconIssue from "../Icons/IconIssue";

const items = [
    {
        text: "Dashboard",
        icon: IconHome,
        path: "/d/dash"
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

const DrawerList = ({ onTap, history, location: { pathname } }) => {
    const classes = useStyles();

    const handleLinkClick = path => () => {
        history.push(path);
        if (typeof onTap === "function") {
            // NOTE: onTap() is only implemented for mobile drawer for closing after click on link item
            onTap();
        }
    };

    const list = items.map(({ text, icon: Icon, path }) => {
        return (
            <ListItem
                button
                key={text}
                selected={path === pathname}
                // disableRipple
                disableTouchRipple
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

export default withRouter(DrawerList);
