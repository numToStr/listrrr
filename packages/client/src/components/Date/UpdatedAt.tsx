import React, { FC, memo } from "react";
import UpdatedAtIcon from "@material-ui/icons/TimelineTwoTone";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { formatDate } from "../../utils/date";
import { BoxProps } from "@material-ui/core/Box";

type Props = BoxProps & {
    date: string;
};

const useStyles = makeStyles(({ spacing }) => ({
    icon: {
        marginRight: spacing(0.5),
    },
}));

const UpdatedAt: FC<Props> = ({ date, ...props }) => {
    const styles = useStyles();
    return (
        <Box display="flex" alignItems="center" {...props}>
            <UpdatedAtIcon
                className={styles.icon}
                fontSize="inherit"
                color="disabled"
            />
            <Typography variant="caption" color="textSecondary">
                updated {formatDate(date)}
            </Typography>
        </Box>
    );
};

export default memo(UpdatedAt);
