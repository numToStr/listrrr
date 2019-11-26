import React, { FC, memo } from "react";
import { makeStyles } from "@material-ui/core";
import Fab, { FabProps } from "@material-ui/core/Fab";
import SelectedIcon from "@material-ui/icons/CheckTwoTone";
import { ThemeColor } from "../../@types/types";

type P = {
    themeColor: ThemeColor;
};

const useStyles = makeStyles(({ palette: { getContrastText } }) => ({
    btn: ({ color }: P["themeColor"]) => {
        const c = color["A400"];
        return {
            "background": c,
            "boxShadow": "none",
            "color": getContrastText(c),
            "transition": "all 0.2s ease-in-out",
            "&:hover": {
                background: c,
                transform: "scale(1.1)",
            },
        };
    },
}));

type Props = FabProps & P;

const ThemeColorButton: FC<Props> = ({ themeColor, ...props }) => {
    const styles = useStyles(themeColor);

    return (
        <Fab
            classes={{
                root: styles.btn,
            }}
            {...props}
        >
            <SelectedIcon />
        </Fab>
    );
};

export default memo(ThemeColorButton);
