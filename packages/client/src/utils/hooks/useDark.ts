import { useMediaQuery } from "@material-ui/core";

export const useDark = () => {
    return useMediaQuery("(prefers-color-scheme: dark)");
};
