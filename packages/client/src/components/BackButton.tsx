import React, { FC } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";
import BaseRouterLink from "./Base/BaseRouterLink";

type Props = IconButtonProps & {
    to: string;
};

const useStyles = makeStyles(({ spacing }) => ({
    btn: {
        marginBottom: spacing(2),
    },
}));

const BackButton: FC<Props> = ({ to }) => {
    const styles = useStyles();

    return (
        <IconButton
            className={styles.btn}
            component={BaseRouterLink}
            color="primary"
            to={to}
        >
            <BackIcon fontSize="small" />
        </IconButton>
    );
};

export default BackButton;
