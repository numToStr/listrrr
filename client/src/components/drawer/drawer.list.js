import React from "react";
import Link from "react-router-dom/Link";
import withRouter from "react-router-dom/withRouter";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/HomeTwoTone";
import ProjectIcon from "@material-ui/icons/AssignmentTwoTone";
import IssuesIcon from "@material-ui/icons/BugReportTwoTone";
import ShowIcon from "@material-ui/icons/PanoramaFishEyeTwoTone";
import HelloIcon from "@material-ui/icons/PetsTwoTone";

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
    },
    {
        text: "Show",
        icon: ShowIcon,
        path: "/d/show"
    },
    {
        text: "Hello",
        icon: HelloIcon,
        path: "/d/hello"
    }
];

const styles = ({ palette }) => ({
    linkColor: {
        color: palette.primary.contrastText
    }
});

const DrawerList = ({ classes, location: { pathname } }) => {
    const list = items.map(({ text, icon: Icon, path }) => {
        const _Link = props => <Link to={path} {...props} />;

        return (
            <ListItem
                button
                key={text}
                component={_Link}
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
