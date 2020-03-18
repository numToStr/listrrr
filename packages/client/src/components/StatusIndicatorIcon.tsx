import React, { FC, memo } from "react";
import { SvgIconProps, makeStyles, Theme } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/ErrorOutline";
import ClosedIcon from "@material-ui/icons/CheckCircleOutline";
import { StatusColors } from "../@types/types";
import { useStatusColor } from "../utils/hooks/useStatusColor";

type Props = SvgIconProps & {
    closed: boolean;
};

type StyleProps = {
    color: StatusColors;
};

const useStyles = makeStyles(({ spacing }: Theme) => {
    const d = spacing(0.5);
    return {
        icon: ({ color }: StyleProps) => ({
            fill: color,
            paddingLeft: d,
            paddingRight: d,
        }),
    };
});

const StatusIndicator: FC<Props> = ({ closed, ...props }) => {
    const color = useStatusColor(closed);
    const classes = useStyles({ color });

    return closed ? (
        <ClosedIcon className={classes.icon} {...props} />
    ) : (
        <OpenIcon className={classes.icon} {...props} />
    );
};

export default memo(StatusIndicator);
