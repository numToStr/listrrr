import { useMemo } from "react";
import { StatusColors } from "../../@types/types";

export const useStatusColor = (closed: boolean): StatusColors => {
    return useMemo(() => {
        return closed ? StatusColors.CLOSED : StatusColors.OPEN;
    }, [closed]);
};
