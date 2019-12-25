import { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";

type StyleProps = {
    color: string;
};

const useStyles = makeStyles({
    bgColor: ({ color }: StyleProps) => ({
        backgroundColor: color,
        color: "#fff",
    }),
    color: ({ color }: StyleProps) => ({
        color,
    }),
});

export const useStatusColor = (closed: boolean) => {
    return useMemo(() => (closed ? "#f00c1d" : "#269f42"), [closed]);
};

export const useStatusClasses = (boolean: boolean) => {
    const color = useStatusColor(boolean);

    return useStyles({ color });
};
