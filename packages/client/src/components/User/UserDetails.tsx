import React, { memo } from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Avatar,
    styled,
} from "@material-ui/core";
import { useIMeQuery } from "../../gql/user.query";
import UserOptions from "../User/UserOptions";

const StyledAvatar = styled(Avatar)(
    ({
        theme: {
            palette: { background, text },
        },
    }) => ({
        background: background.paper,
        color: text.secondary,
    })
);

const UserDetails = () => {
    const { data } = useIMeQuery();

    if (!data) {
        return <Typography>...</Typography>;
    }

    const { username, email } = data.me;

    const [avatar] = username.toUpperCase().split("");

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <StyledAvatar alt="Remy Sharp">{avatar}</StyledAvatar>
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
            <UserOptions />
        </ListItem>
    );
};

export default memo(UserDetails);
