import React, { memo, FC } from "react";
import { Box, Grid } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { ThemeBgColorType } from "../../@types/types";
import ThemeBgColorButton from "./ThemeBgColorButton";
import { ThemeBgColorsMap } from "../../utils/theme";

const colors: ThemeBgColorType[] = Object.values(ThemeBgColorsMap);

const ThemeBgColorList: FC<BoxProps> = props => {
    const list = colors.map((color, index) => (
        <Grid key={index} item xs={12} md>
            <ThemeBgColorButton themeColor={color} />
        </Grid>
    ));

    return (
        <Box mb={2} {...props}>
            <Grid container justify="center" spacing={1}>
                {list}
            </Grid>
        </Box>
    );
};

export default memo(ThemeBgColorList);
