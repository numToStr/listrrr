import React, { memo, Fragment, useState } from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    makeStyles,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/SettingsTwoTone";
import { useIMeQuery } from "../../gql/user.query";
import ThemeColorList from "../Theme/ThemeColorList";
import ThemeBgColorList from "../Theme/ThemeBgColorList";

const useStyles = makeStyles(({ palette: { background, text } }) => ({
    avatar: {
        background: background.paper,
        color: text.secondary,
    },
}));

const DrawerUserItem = () => {
    const styles = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const { data } = useIMeQuery();

    const handleOpen = () => setOpen(v => !v);

    if (!data) {
        return <Typography>...</Typography>;
    }

    const { username, email } = data.me;

    const [avatar] = username.toUpperCase().split("");

    return (
        <Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar className={styles.avatar} alt="Remy Sharp">
                        {avatar}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={username}
                    secondary={
                        <Typography
                            component="p"
                            variant="caption"
                            color="inherit"
                            noWrap
                        >
                            {email}
                        </Typography>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton
                        color="inherit"
                        edge="end"
                        aria-label="comments"
                        onClick={handleOpen}
                    >
                        <SettingsIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Dialog
                fullWidth
                open={open}
                onClose={handleOpen}
                aria-labelledby="user-settings-dailog"
            >
                <DialogTitle id="user-setting-title" disableTypography>
                    <Typography variant="h6" align="center">
                        Customize your view
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Color</DialogContentText>
                    <ThemeColorList />
                    <DialogContentText>Background</DialogContentText>
                    <ThemeBgColorList />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default memo(DrawerUserItem);
