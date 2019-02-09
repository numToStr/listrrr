import React, { memo } from "react";
import Link from "react-router-dom/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";

import HomeIcon from "@material-ui/icons/HomeTwoTone";
import LiveQuizIcon from "@material-ui/icons/QuestionAnswerTwoTone";
import ShowIcon from "@material-ui/icons/PanoramaFishEyeTwoTone";
import HelloIcon from "@material-ui/icons/PetsTwoTone";

const items = [
    {
        text: "Home 😋",
        icon: HomeIcon,
        path: "/d"
    },
    {
        text: "Live Quiz",
        icon: LiveQuizIcon,
        path: "/d/livequiz"
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

const DrawerList = ({ classes }) => {
    const list = items.map(({ text, icon: Icon, path }) => {
        const _Link = props => <Link to={path} {...props} />;

        return (
            <ListItem button key={text} component={_Link}>
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

export default memo(withStyles(styles)(DrawerList));
