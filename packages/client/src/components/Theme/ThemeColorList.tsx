import React, { memo, FC } from "react";
import { Box } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import ThemeColorButton from "./ThemeColorButton";
import { ThemeColorType } from "../../@types/types";
import { ThemeColorsMap } from "../../utils/theme";

const colors: ThemeColorType[] = Object.values(ThemeColorsMap);

const ThemeColorList: FC<BoxProps> = props => {
    const list = colors.map((color, index) => (
        <ThemeColorButton key={index} themeColor={color} />
    ));

    return (
        <Box display="flex" justifyContent="space-evenly" mb={3} {...props}>
            {list}
        </Box>
    );
};

export default memo(ThemeColorList);
