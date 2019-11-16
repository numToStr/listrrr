import React, { FC, memo, useMemo } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import OpenIcon from "@material-ui/icons/ErrorTwoTone";
import ClosedIcon from "@material-ui/icons/CheckCircleTwoTone";
import { useStausColor } from "../utils/hooks/useStatusColor";

type Props = ChipProps & {
    closed: boolean;
};

type StyleProps = {
    color: string;
};

const useStyles = makeStyles(() => {
    return createStyles({
        chip: ({ color }: StyleProps) => ({
            backgroundColor: color,
            color: "#fff",
        }),
        icon: {
            color: "#fff",
        },
    });
});

const StatusIndicator: FC<Props> = ({ closed, ...props }) => {
    const color = useStausColor(closed);
    const styles = useStyles({ color });

    const status = useMemo(() => {
        return closed
            ? {
                  label: "Closed",
                  icon: <ClosedIcon fontSize="small" color="inherit" />,
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
                root: styles.chip,
                icon: styles.icon,
            }}
            {...props}
        />
    );
};

export default memo(StatusIndicator);
