import { useMemo } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const closeColor = "#f00c1d";
const openColor = "#269f42";

type StyleProps = {
    color: string;
};

const useStyles = makeStyles(() => {
    return createStyles({
        bgColor: ({ color }: StyleProps) => ({
            backgroundColor: color,
            color: "#fff",
        }),
        color: ({ color }: StyleProps) => ({
            color,
        }),
    });
});

export const useStatusColor = (closed: boolean) => {
    return useMemo(() => (closed ? closeColor : openColor), [closed]);
};

export const useStatusClasses = (boolean: boolean) => {
    const color = useStatusColor(boolean);

    return useStyles({ color });
};
