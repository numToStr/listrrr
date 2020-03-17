import React, { FC, memo, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import OpenIcon from "@material-ui/icons/ErrorTwoTone";
import ClosedIcon from "@material-ui/icons/CheckCircleTwoTone";
import { StatusColors } from "../@types/types";
import { useStatusColor } from "../utils/hooks/useStatusColor";

type Props = ChipProps & {
    closed: boolean;
};

type StyleProps = {
    color: StatusColors;
};

const useStyles = makeStyles(() => ({
    text: {
        color: "#fff",
    },
    bg: ({ color }: StyleProps) => ({
        backgroundColor: color,
    }),
}));

const StatusIndicator: FC<Props> = ({ closed, ...props }) => {
    const color = useStatusColor(closed);
    const classes = useStyles({ color });

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
                root: classes.bg,
                label: classes.text,
                icon: classes.text,
            }}
            {...props}
        />
    );
};

export default memo(StatusIndicator);
