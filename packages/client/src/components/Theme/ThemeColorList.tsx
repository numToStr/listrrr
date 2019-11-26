import React, { memo, FC } from "react";
import { Box } from "@material-ui/core";
import {
    green,
    orange,
    red,
    deepPurple,
    yellow,
    blue,
} from "@material-ui/core/colors";
import { BoxProps } from "@material-ui/core/Box";
import ThemeColorButton from "./ThemeColorButton";
import { ThemeColor } from "../../@types/types";

const colors: ThemeColor[] = [
    {
        color: red,
        key: "red",
    },
    {
        color: blue,
        key: "blue",
    },
    {
        color: yellow,
        key: "yellow",
    },
    {
        color: green,
        key: "green",
    },
    {
        color: deepPurple,
        key: "deepPurple",
    },
    {
        color: orange,
        key: "orange",
    },
];

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
