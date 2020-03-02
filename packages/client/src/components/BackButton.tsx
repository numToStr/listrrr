import React, { memo, FC } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(({ spacing }) => ({
    btn: {
        marginBottom: spacing(2),
    },
}));

const BackButton: FC<IconButtonProps> = () => {
    const { goBack } = useHistory();
    const styles = useStyles();

    return (
        <IconButton className={styles.btn} color="primary" onClick={goBack}>
            <BackIcon fontSize="small" />
        </IconButton>
    );
};

export default memo(BackButton);
