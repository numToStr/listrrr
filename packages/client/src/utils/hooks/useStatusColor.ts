import { useMemo } from "react";

const closeColor = "#f00c1d";
const openColor = "#269f42";

export const useStausColor = (closed: boolean) => {
    return useMemo(() => (closed ? closeColor : openColor), [closed]);
};
