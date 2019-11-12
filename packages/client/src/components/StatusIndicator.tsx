import React, { FC } from "react";
import OpenIcon from "@material-ui/icons/ErrorTwoTone";
import ClosedIcon from "@material-ui/icons/CheckCircleTwoTone";
import { Chip, makeStyles } from "@material-ui/core";
import { ChipProps } from "@material-ui/core/Chip";

type Props = ChipProps & {
    closed: boolean;
};

const useStyles = makeStyles(() => {
    return {
        open: {
            backgroundColor: "#269f42",
            color: "#fff"
        },
        closed: {
            backgroundColor: "#f00c1d",
            color: "#fff"
        },
        icon: {
            color: "#fff"
        }
    };
});

const StatusIndicator: FC<Props> = ({ closed, ...props }) => {
    const styles = useStyles();

    return closed ? (
        <Chip
            label="Closed"
            icon={<ClosedIcon fontSize="small" color="inherit" />}
            size="small"
            classes={{
                root: styles.closed,
                icon: styles.icon
            }}
            {...props}
        />
    ) : (
        <Chip
            label="Open"
            icon={<OpenIcon fontSize="small" />}
            size="small"
            classes={{
                root: styles.open,
                icon: styles.icon
            }}
            {...props}
        />
    );
};

export default StatusIndicator;
