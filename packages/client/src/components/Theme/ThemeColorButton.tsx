import React, { FC, memo } from "react";
import { makeStyles, useMediaQuery, Theme } from "@material-ui/core";
import Fab, { FabProps } from "@material-ui/core/Fab";
import SelectedIcon from "@material-ui/icons/CheckTwoTone";
import { ThemeColor } from "../../@types/types";
import { useAppColor } from "./ThemeContext";

type P = {
    themeColor: ThemeColor;
};

const useStyles = makeStyles(({ palette: { getContrastText } }) => ({
    btn: ({ color }: P["themeColor"]) => {
        const c = color["500"];
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
    const isMobile = useMediaQuery<Theme>(({ breakpoints: b }) => b.down("xs"));
    const { color, changeColor } = useAppColor();
    const styles = useStyles(themeColor);

    const handleClick = () => changeColor(themeColor);

    return (
        <Fab
            size={isMobile ? "small" : "large"}
            onClick={handleClick}
            classes={{
                root: styles.btn,
            }}
            {...props}
        >
            {themeColor.key === color.key ? <SelectedIcon /> : <div />}
        </Fab>
    );
};

export default memo(ThemeColorButton);
