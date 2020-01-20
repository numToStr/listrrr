import React, {
    Fragment,
    useState,
    ComponentType,
    lazy,
    useMemo,
    useCallback,
    MouseEvent,
    memo,
} from "react";
import {
    ListItemSecondaryAction,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    styled,
    IconProps,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVertTwoTone";
import SettingsIcon from "@material-ui/icons/SettingsTwoTone";
import ThemeIcon from "@material-ui/icons/ColorLensTwoTone";
import LogoutIcon from "@material-ui/icons/ArrowBackTwoTone";
import { useILogout } from "../../gql/auth.query";

const ThemeDailog = lazy(() =>
    import(/* webpackChunkName: "ThemeDailog" */ "../Theme/ThemeDailog")
);

interface MenuList {
    title: string;
    icon: ComponentType<IconProps>;
    onClick(): void;
}

const StyledItem = styled(ListItemIcon)(({ theme: { mixins } }) => {
    const { paddingRight } = mixins.gutters();
    return {
        minWidth: 0,
        paddingRight,
    };
});

const UserOptions = () => {
    const logout = useILogout();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    const toggleDailog = useCallback(() => setOpen(v => !v), [setOpen]);
    const onTapItem = (fn: Function) => async () => {
        setAnchorEl(null);
        await fn();
    };

    const lists = useMemo<MenuList[]>(
        () => [
            {
                title: "Settings",
                icon: SettingsIcon,
                onClick: onTapItem(() => {}),
            },
            {
                title: "Theme",
                icon: ThemeIcon,
                onClick: onTapItem(toggleDailog),
            },
            {
                title: "Logout",
                icon: LogoutIcon,
                onClick: onTapItem(logout),
            },
        ],
        [toggleDailog, logout]
    );

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <Fragment>
            <ListItemSecondaryAction>
                <IconButton
                    color="inherit"
                    edge="end"
                    aria-label="comments"
                    onClick={handleOpen}
                >
                    <MenuIcon />
                </IconButton>
            </ListItemSecondaryAction>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {lists.map((l, index) => (
                    <MenuItem dense key={index} onClick={l.onClick}>
                        <StyledItem>
                            <l.icon fontSize="small" />
                        </StyledItem>
                        <ListItemText primary={l.title} />
                    </MenuItem>
                ))}
            </Menu>
            <ThemeDailog hidden={!open} open={open} onClose={toggleDailog} />
        </Fragment>
    );
};

export default memo(UserOptions);
