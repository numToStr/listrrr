import React, { FC, memo, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import OpenIcon from "@material-ui/icons/ErrorTwoTone";
import ClosedIcon from "@material-ui/icons/CheckCircleTwoTone";
import { useStatusClasses } from "../utils/hooks/useStatusColor";

type Props = ChipProps & {
    closed: boolean;
};

const useStyles = makeStyles(() => ({
    icon: {
        color: "#fff",
    },
}));

const StatusIndicator: FC<Props> = ({ closed, ...props }) => {
    const styles = useStyles();
    const classes = useStatusClasses(closed);

    const status = useMemo(() => {
        return closed
            ? {
                  label: "Closed",
                  icon: <ClosedIcon fontSize="small" />,
              }
            : {
                  label: "Open",
                  icon: <OpenIcon fontSize="small" />,
              };
    }, [closed]);

    return (
        <Chip
            label={status.label}
            icon={status.icon}
            size="small"
            classes={{
                root: classes.bgColor,
                icon: styles.icon,
            }}
            {...props}
        />
    );
};

export default memo(StatusIndicator);
