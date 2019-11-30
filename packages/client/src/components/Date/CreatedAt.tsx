import React, { FC, memo } from "react";
import { BoxProps } from "@material-ui/core/Box";
import CreatedAtIcon from "@material-ui/icons/AccessTimeOutlined";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { formatDate } from "../../utils/date";

type Props = BoxProps & {
    date: string;
};

const useStyles = makeStyles(({ spacing }) => ({
    icon: {
        marginRight: spacing(0.5),
    },
}));

const CreatedAt: FC<Props> = ({ date, ...props }) => {
    const styles = useStyles();

    return (
        <Box display="flex" alignItems="center" {...props}>
            <CreatedAtIcon className={styles.icon} fontSize="inherit" />
            <Typography variant="caption" color="textSecondary">
                created {formatDate(date)}
            </Typography>
        </Box>
    );
};

export default memo(CreatedAt);
