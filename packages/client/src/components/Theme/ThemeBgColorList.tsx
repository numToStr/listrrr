import React, { memo, FC } from "react";
import { Box, Grid } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { ThemeBgColor } from "../../@types/types";
import ThemeBgColorButton from "./ThemeBgColorButton";

const colors: ThemeBgColor[] = [
    {
        key: "light-up",
        color: "#fff",
        title: "Light Up",
    },
    {
        key: "dim",
        color: "#3d3d3d",
        title: "Dim",
    },
    {
        key: "so-dark",
        color: "#212121",
        title: "So Dark",
    },
];

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
