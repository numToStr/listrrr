import React, { FC, memo } from "react";
import { SvgIconProps, makeStyles, Theme } from "@material-ui/core";
import OpenIcon from "@material-ui/icons/ErrorOutline";
import ClosedIcon from "@material-ui/icons/CheckCircleOutline";
import { StatusColors } from "../@types/types";

type Props = SvgIconProps & {
    closed: boolean;
};

type StyleProps = {
    closed: boolean;
};

const useStyles = makeStyles(({ spacing }: Theme) => {
    const d = spacing(0.5);
    return {
        icon: ({ closed }: StyleProps) => ({
            fill: closed ? StatusColors.CLOSED : StatusColors.OPEN,
            paddingLeft: d,
            paddingRight: d,
        }),
    };
});

const StatusIndicator: FC<Props> = ({ closed, ...props }) => {
    const classes = useStyles({ closed });

    return closed ? (
        <ClosedIcon className={classes.icon} {...props} />
    ) : (
        <OpenIcon className={classes.icon} {...props} />
    );
};

export default memo(StatusIndicator);
